import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import login_image from "../../assets/images/loginForm-image.png";
import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import rightArrow from "../../assets/icons/right_arrow.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/context/auth";
import axiosInstance from "../../utils/axiosHelper";
import { setCookie } from "../../services/cookie";

function ConfirmOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationData = location.state?.registrationData;
  const subscriptionData = location.state?.subscriptionData || {};
  const { login } = useContext(AuthContext);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

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

  useEffect(() => {
    if (!registrationData) {
      navigate("/signup", { replace: true });
    }
  }, [registrationData, navigate]);

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

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];

    if (!/^\d*$/.test(value)) return;

    if (e.key === "Backspace") {
      if (value.length === 0 && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerifyLoading(true);
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter complete OTP");
      setVerifyLoading(false);
      return;
    }

    try {
      if (!registrationData?.email) {
        throw new Error("Invalid email address!");
      }
      // First verify the OTP
      const verifyResponse = await axiosInstance.post("user/verify-otp", {
        email: registrationData.email,
        otp: otpString,
      });

      // If verification succeeds, attempt auto-login
      const authData = {
        token: verifyResponse.token,
        user: verifyResponse.user,
        isAuthenticated: true,
      };

      // Log user in and show success message
      login(authData);
      setCookie("token", verifyResponse.token);
      toast.success(verifyResponse.message, toastStyles);

      if (subscriptionData && Object.keys(subscriptionData)?.length) {
        navigate("/billing", { state: { subscriptionData }, replace: true });
      } else {
        navigate("/signup-configuration");
      }
    } catch (error) {
      // Handle all error cases
      let errorMessage =
        error.message || "Something went wrong. Please try again.";
      toast.error(errorMessage, toastStyles);
      console.error("OTP verification error:", error);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (!canResend) return;

    setResendLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("user/resend-otp", {
        email: registrationData.email,
        resend: true,
      });
      setTimeLeft(60);
      setCanResend(false);
      setError("");
      setOtp(new Array(6).fill(""));
      toast.success(response.message, toastStyles);
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.", toastStyles);
      console.error("Resend OTP error:", err);
    } finally {
      setResendLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);

      if (newOtp.length === 6) {
        document.getElementById(`otp-input-5`).focus();
      }
    } else {
      toast.error("Please paste a valid 6-digit OTP.", toastStyles);
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
            className="w-full h-full object-cover md:rounded-none"
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
              <h4 className="mt-7 text-xl font-bold leading-9 tracking-tight text-white">
                OTP Verification
              </h4>
              <p className="text-white flex justify-center mt-4">
                Enter the 6-digit OTP sent to <br />
                {registrationData?.email && (
                  <span className="font-semibold ">
                    {registrationData.email}
                  </span>
                )}
              </p>
            </div>

            {error && (
              <div className="mt-4 p-2 text-red-500 text-sm text-center bg-red-100 rounded-md">
                {error}
              </div>
            )}

            <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
              <div>
                <div className="mt-4 space-y-2 dark:text-black">
                  <div className="flex justify-between" onPaste={handlePaste}>
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        className="w-10 px-2 py-2 mb-4 border rounded-md text-center text-black text-xl outline-none border-black"
                        value={value}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpChange(e, index)}
                        disabled={verifyLoading}
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={verifyLoading}
                  style={{
                    background:
                      "linear-gradient(180deg, #B039FF 0%, #A871FF 100%)",
                    color: "white",
                    opacity: verifyLoading ? 0.7 : 1,
                  }}
                  className="flex items-center justify-center w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-3"
                >
                  {verifyLoading ? "Verifying..." : "Verify"}
                  {!verifyLoading && (
                    <img
                      src={rightArrow}
                      alt="Arrow"
                      className="h-5 w-5 ml-2"
                      loading="lazy"
                    />
                  )}
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
                      : `Resend in ${Math.floor(timeLeft / 60)}:${(
                          timeLeft % 60
                        )
                          .toString()
                          .padStart(2, "0")}`}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default ConfirmOtp;
