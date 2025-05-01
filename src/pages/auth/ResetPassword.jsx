import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../../utils/axiosHelper";
import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import login_image from "../../assets/images/loginForm-image.png";
import { toastStyles } from "../../utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!email || !validateEmailFormat(email)) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePasswordMatch = () => {
    return formData.newPassword === formData.confirmPassword;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePasswordMatch()) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post("user/reset-password", {
        email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      toast.success("Password reset successfully!");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      console.error("Reset Password error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (!canResend) return;

    setResendLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("user/resend-otp", {
        email,
        resend: true,
        reset: true,
      });
      setTimeLeft(60);
      setCanResend(false);
      setError("");
      setFormData((prev) => ({ ...prev, otp: "" }));
      toast.success(response.message, toastStyles);
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.", toastStyles);
      console.error("Resend OTP error:", err);
    } finally {
      setResendLoading(false);
    }
  };

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
              {" "}
            </h1>
            <p className="text-white flex justify-center mt-4"> </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex justify-center max-h-screen overflow-hidden md:p-10 my-5">
          <div className="flex flex-col justify-center px-6 md:py-12 w-full max-w-sm mx-auto">
            <div className="text-center">
              <Link to="/">
                <img
                  alt="TradeXpert"
                  src={tradeXlogo}
                  className="mx-auto h-10 w-auto cursor-pointer"
                  loading="lazy"
                />
              </Link>
              <h2 className="mt-7 text-2xl font-bold leading-9 tracking-tight text-white">
                Reset Password
              </h2>
            </div>

            {error && (
              <div className="mt-2 p-2 text-red-500 text-sm text-center bg-red-100 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  OTP <span className="text-red-500">*</span>
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={formData.otp}
                  onChange={handleInputChange}
                  required
                  className="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                    className="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-900 right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon size={16} />
                    ) : (
                      <EyeOffIcon size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-900 right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon size={16} />
                    ) : (
                      <EyeOffIcon size={16} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
              <p className="mb-5 text-center text-sm text-gray-500 mt-2">
                Didn't get any OTP?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || resendLoading}
                  className={`font-semibold leading-6 ${
                    !canResend || resendLoading
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  style={{ textDecoration: "underline" }}
                >
                  {resendLoading
                    ? "Sending OTP..."
                    : canResend
                    ? "Resend code"
                    : `Resend in ${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                        .toString()
                        .padStart(2, "0")}`}
                </button>
              </p>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default ResetPassword;
