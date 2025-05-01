import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosHelper";
import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import login_image from "../../assets/images/loginForm-image.png";
import { toastStyles } from "../../utils";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("user/forgot-password", {
        email,
      });

      toast.success(response.message, toastStyles);

      setTimeout(() => {
        navigate("/reset-password", {
          state: { email },
          replace: true,
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
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
                Forgot Password
              </h2>
            </div>

            {error && (
              <div className="mt-2 p-2 text-red-500 text-sm text-center bg-red-100 rounded-md">
                {error}
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
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
};

export default ForgotPassword;
