import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../components/context/auth";
import { toast, Toaster } from "react-hot-toast";
import login_image from "../../assets/images/loginForm-image.png";
import google_icon from "../../assets/icons/google_icon.svg";
import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import rightArrow from "../../assets/icons/right_arrow.svg";
import eye from "../../assets/icons/eye.svg";
import axiosInstance from "../../utils/axiosHelper";
import GoogleAuthLogin from "./GoogleAuthLogin";
import { authGoogleCallback } from "../../api";
import { setCookie } from "../../services/cookie";

function Login() {
  // Custom toast styles matching the page design
  const toastStyles = {
    style: {
      background: "linear-gradient(180deg, #B039FF 0%, #A871FF 100%)",
      color: "white",
      padding: "16px",
      borderRadius: "8px",
      fontWeight: "500",
    },
    duration: 2000,
  };

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("user/login", {
        email: formData.email,
        password: formData.password,
      });
      // Store all auth data using the context
      const authData = {
        token: response.token,
        user: response.user, // Assuming the API returns user data
        isAuthenticated: true,
        // Add any other relevant auth data from the response
      };

      // Use the login function from AuthContext
      login(authData);

      setCookie("token", response.token);

      // If remember me is checked, store email separately
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      // Show success toast
      toast.success("Login successfully!", toastStyles);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/dashboard", {
          replace: true,
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          setError("Please enter a valid email address");
        } else {
          setError("");
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          setError(
            "Password must be at least 8 characters long and contain uppercase, lowercase, numbers and special characters"
          );
        } else {
          setError("");
        }
        break;
      default:
        break;
    }
  };

  const handleGoogleResponse = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await authGoogleCallback(authResult.code);

        const authData = {
          token: result.data.token,
          user: result.data.user,
          isAuthenticated: true,
        };

        // Show success toast
        toast.success("Login successfully!", toastStyles);

        // Use the login function from AuthContext
        login(authData);

        setCookie("token", result.data.token);

        // Navigate to dashboard after 2 seconds
        setTimeout(() => {
          if (result?.data?.user?.is_first_visit) {
            navigate("/signup-configuration", {
              replace: true,
            });
          } else {
            navigate("/dashboard", {
              replace: true,
            });
          }
        }, 2000);
      } else {
        setError("Something went wrong. Please try again.");
        console.error("Google auth error:", authResult);
      }
    } catch (e) {
      console.error("Error while Google Login...", e);
      setError("Something went wrong. Please try again.");
    }
  };

  // Check for remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 h-screen w-screen bg-[#020204] bg-gradient-to-r from-[#020204] via-[#0f0117] to-[#3b0061] overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block rounded-md relative">
          <img
            src={login_image}
            alt="login-form-image"
            className="w-full h-full object-cover cursor-pointer"
            style={{
              borderTopRightRadius: "80px",
              borderBottomRightRadius: "80px",
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-5 pt-60">
            <h1 className="font-gilroy text-4xl text-white font-bold flex justify-center">
              Welcome back!
            </h1>
            <p className="text-white flex justify-center mt-4">
              Access your account and stay connected to your trading success.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex justify-center max-h-screen overflow-hidden md:p-10 my-5">
          <div className="flex flex-col justify-center px-6 md:py-12 w-full max-w-sm mx-auto">
            <div className="text-center">
              <Link to="/">
                <img
                  alt="Your Company"
                  src={tradeXlogo}
                  className="mx-auto h-10 w-auto cursor-pointer"
                  loading="lazy"
                />
              </Link>
              <h2 className="mt-7 text-2xl font-bold leading-9 tracking-tight text-white">
                Login
              </h2>
            </div>

            {error && (
              <div className="mt-2 p-2 text-red-500 text-sm text-center bg-red-100 rounded-md">
                {error}
              </div>
            )}

            <div className="mt-5">
              <GoogleAuthLogin onLoginSuccess={handleGoogleResponse}>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-white px-2 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <img
                    src={google_icon}
                    alt="Google Logo"
                    className="h-5 w-5 mr-2"
                    loading="lazy"
                  />
                  Sign in with Google
                </button>
              </GoogleAuthLogin>

              <div className="flex items-center justify-center my-3">
                <div className="border-t border-gray-500 flex-grow"></div>
                <span className="px-4 text-gray-400">or</span>
                <div className="border-t border-gray-500 flex-grow"></div>
              </div>
            </div>

            <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <img
                    src={eye}
                    alt="Show/Hide password"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
                    loading="lazy"
                  />
                </div>
                <div className="grid grid-cols-2 pt-2">
                  <div className="flex justify-start items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <p className="text-white text-sm px-2">Remember me</p>
                  </div>
                  <div>
                    <Link
                      to="/forgot-password"
                      className="flex flex-row-reverse text-white text-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background:
                      "linear-gradient(180deg, #B039FF 0%, #A871FF 100%)",
                    color: "white",
                    opacity: loading ? 0.7 : 1,
                  }}
                  className="flex items-center justify-center mt-10 w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && (
                    <img
                      src={rightArrow}
                      alt="Arrow"
                      className="h-5 w-5 ml-2"
                      loading="lazy"
                    />
                  )}
                </button>
              </div>
            </form>

            <p className="mb-5 text-center text-sm text-gray-500 mt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 ml-1"
                style={{
                  background:
                    "linear-gradient(180deg, #B039FF 0%, #A871FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Login;
