import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import login_image from "../../assets/images/loginForm-image.png";
import google_icon from "../../assets/icons/google_icon.svg";
import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import rightArrow from "../../assets/icons/right_arrow.svg";
import eye from "../../assets/icons/eye.svg";
import axiosInstance from "../../utils/axiosHelper";
import GoogleAuthLogin from "./GoogleAuthLogin";
import { authGoogleCallback } from "../../api";
import { AuthContext } from "../../components/context/auth";
import { setCookie } from "../../services/cookie";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const subscriptionData = location?.state?.subscriptionData || {};
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_no: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      if (!isValidPhoneNumber(`+${formData.mobile_no}`)) {
        throw new Error("Please enter a valid phone number");
      }
      await axiosInstance.post("user/register", {
        full_name: formData.full_name,
        email: formData.email,
        mobile_no: formData.mobile_no,
        password: formData.password,
      });
      let state = {
        registrationData: {
          full_name: formData.full_name,
          email: formData.email,
          mobile_no: formData.mobile_no,
          password: formData.password,
        },
      };

      if (subscriptionData && Object.keys(subscriptionData)?.length) {
        state = {
          ...state,
          subscriptionData,
        };
      }

      navigate("/confirm-otp", { state, replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
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
      case "password":
        if (!validatePassword(value)) {
          setError(
            "Password must be at least 8 characters long and contain uppercase, lowercase, numbers and special characters"
          );
        } else {
          setError("");
        }
        break;
      case "email":
        if (!value.includes("@")) {
          setError("Please enter a valid email address");
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
        toast.success("Signup successfully!", toastStyles);

        // Use the login function from AuthContext
        login(authData);

        setCookie("token", result.data.token);

        if (subscriptionData && Object.keys(subscriptionData)?.length) {
          navigate("/billing", {
            state: { subscriptionData },
            replace: true,
          });
        } else {
          navigate("/signup-configuration");
        }
      } else {
        setError("Something went wrong. Please try again.");
        console.error("Google auth error:", authResult);
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
      console.error("Error while Google Login...", e);
    }
  };

  return (
    <div className="grid md:grid-cols-2 h-screen w-screen bg-[#020204] bg-gradient-to-r from-[#020204] via-[#0f0117] to-[#3b0061] overflow-hidden">
      {/* Left Image Section */}
      <div className="hidden md:block rounded-md relative">
        <img
          src={login_image}
          alt="login-form-image"
          className="w-full h-full object-cover"
          style={{
            borderTopRightRadius: "80px",
            borderBottomRightRadius: "80px",
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-5 pt-60">
          <h1 className="font-gilroy text-4xl text-white font-bold flex justify-center">
            Start Your Trading Journey
          </h1>
          <p className="text-white flex justify-center mt-4">
            Sign Up with TradeXpert Today
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex justify-center h-screen overflow-hidden md:p-10 my-5">
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
              Sign Up
            </h2>
          </div>

          {error && (
            <div className="mt-2 p-2 text-red-500 text-sm text-center bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div className="mt-3">
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
                Sign up with Google
              </button>
            </GoogleAuthLogin>

            <div className="flex items-center justify-center mt-3">
              <div className="border-t border-gray-500 flex-grow"></div>
              <span className="px-4 text-gray-400">or</span>
              <div className="border-t border-gray-500 flex-grow"></div>
            </div>
          </div>

          <form className="space-y-1 mt-3" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  autoComplete="full_name"
                  placeholder="Enter your full name"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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

            <label
              htmlFor="mobile_no"
              className="block text-sm font-medium mt-3 mb-4 leading-6 text-white"
            >
              Mobile No <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              <PhoneInput
                className="w-full py-1 black-text-white-background"
                international={true}
                countryCallingCodeEditable={false}
                defaultCountry="US"
                placeholder="Enter your number"
                value={
                  formData.mobile_no ? `+${formData.mobile_no}` : undefined
                }
                onChange={(value) => {
                  if (value) {
                    let updatedValue = value.replace("+", "").trim();
                    setFormData((prev) => ({
                      ...prev,
                      mobile_no: updatedValue,
                    }));
                  }
                }}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-white">
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
                    className="h-4 w-4 mt-2 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <p className="text-white text-sm px-2 mt-1">Remember me</p>
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
                className="flex items-center mt-5 justify-center w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {loading ? "Sending OTP..." : "Sign Up"}
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 ml-1"
              style={{
                background: "linear-gradient(180deg, #B039FF 0%, #A871FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SignUp;
