import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import { useUserCredentials } from "../context/user";
import axiosInstance from "../../utils/axiosHelper";
import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import { toastStyles } from "../../utils";
import WhatsappInstructions from "../../pages/dashboard/WhatsappInstructions";
import TelegramInstructions from "../../pages/dashboard/TelegramInstructions";
import QRCodeModal from "./QRCodeModal";

const SetupCommunication = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { data, refreshUserData } = useUserCredentials();
  const [formData, setFormData] = useState({
    telegram_no: "",
    whatsapp_no: "",
  });
  const [whatsappStatus, setWhatsappStatus] = useState({
    isModified: false,
    isChecking: false,
    isConnected: Boolean(data?.whatsapp_no),
    isModalOpen: false,
  });
  const [telegramStatus, setTelegramStatus] = useState({
    isModified: false,
    isChecking: false,
    isConnected: Boolean(data?.telegram_chat_id),
    isModalOpen: false,
  });
  const [finalLoading, setFinalLoading] = useState(false);
  const telegramIntervalRef = useRef(null);

  // Function to check for telegram connection
  const checkTelegramConnection = async () => {
    let attempts = 0;
    const maxAttempts = 30; // Check for 30 seconds

    // Clear any existing interval before starting a new one
    if (telegramIntervalRef.current) {
      clearInterval(telegramIntervalRef.current);
    }

    setTelegramStatus((prev) => ({ ...prev, isChecking: true })); // Start the checking process

    telegramIntervalRef.current = setInterval(async () => {
      if (attempts >= maxAttempts) {
        clearInterval(telegramIntervalRef.current); // Stop after max attempts
        setTelegramStatus((prev) => ({ ...prev, isChecking: false }));
        toast.error("Failed to connect to Telegram.");
        return;
      }

      try {
        const updatedData = await refreshUserData(); // Get fresh data
        if (updatedData?.user.telegram_chat_id) {
          clearInterval(telegramIntervalRef.current); // Stop the interval if connected
          setTelegramStatus((prev) => ({
            ...prev,
            isConnected: true,
            isChecking: false,
            isModified: false,
            isModalOpen: false,
          }));
          toast.success("Telegram connected successfully!", toastStyles);
        }
      } catch (error) {
        console.error("Error checking telegram connection:", error);
      }

      attempts++;
    }, 5000);
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        telegram_no: "",
        whatsapp_no: "",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (telegramIntervalRef.current) {
        setTelegramStatus((prev) => ({ ...prev, isChecking: false }));
        return clearInterval(telegramIntervalRef.current);
      }
    };
  }, []);

  const handleConnectTelegram = (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(`+${formData?.telegram_no}`)) {
      toast.error(
        "Invalid Telegram number. Please enter a valid number.",
        toastStyles
      );
      return;
    }
    axiosInstance
      .put("user/update", {
        telegram_no: formData.telegram_no,
      })
      .then((response) => {
        if (response && window) {
          setTelegramStatus((prev) => ({ ...prev, isModalOpen: true }));
          checkTelegramConnection();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleConnectWhattsapp = (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(`+${formData?.whatsapp_no}`)) {
      toast.error(
        "Invalid Whatsapp number. Please enter a valid number.",
        toastStyles
      );
      return;
    }
    axiosInstance
      .put("user/update", {
        whatsapp_no: formData.whatsapp_no,
      })
      .then(async (response) => {
        if (response && window) {
          setWhatsappStatus((prev) => ({
            ...prev,
            isModified: false,
            isConnected: true,
            isModalOpen: true,
          }));
          await refreshUserData();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async () => {
    setFinalLoading(true);
    try {
      await axiosInstance.put(`user/update`, {
        is_first_visit: false,
      });
      await refreshUserData();

      toast.success("Login Successful!", toastStyles);
      onClose();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setFinalLoading(true);
    }
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="mdl-bg fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onMouseDown={handleMouseDown}
      >
        <div
          className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative"
          onMouseDown={handleMouseDown}
        >
          <Toaster position="top-center" />
          <div className="flex justify-center mb-6">
            <img
              src={tradeXlogo}
              alt="TradeXpert"
              className="h-8"
              loading="lazy"
            />
          </div>

          <h2 className="text-white text-2xl py-3 font-semibold mb-4 text-center">
            Please add your number to setup communication channel
          </h2>
          <section className="py-2">
            <label className="flex items-center gap-2 block text-sm text-gray-300 mb-2">
              Telegram Number
              <TelegramInstructions />
            </label>
            <PhoneInput
              international={true}
              countryCallingCodeEditable={false}
              defaultCountry="US"
              placeholder="Enter telegram number"
              value={
                formData.telegram_no ? `+${formData.telegram_no}` : undefined
              }
              onChange={(value) => {
                if (value) {
                  let updatedValue = value.replace("+", "").trim();
                  setFormData((prev) => ({
                    ...prev,
                    telegram_no: updatedValue,
                  }));
                  setTelegramStatus((prev) => ({
                    ...prev,
                    isModified: updatedValue !== data?.telegram_no,
                  }));
                }
              }}
            />
            <div className="mt-4 flex justify-center">
              <button
                className={`border ${
                  telegramStatus.isConnected
                    ? "border-blue-500 text-blue-300 cursor-not-allowed"
                    : "border-[#27A7E7] hover:border-blue-300"
                } ${
                  telegramStatus.isChecking ? "opacity-75 cursor-wait" : ""
                } rounded-lg px-2 py-2`}
                onClick={handleConnectTelegram}
                disabled={telegramStatus.isConnected}
              >
                <span
                  className={`${
                    telegramStatus.isConnected
                      ? "text-blue-500"
                      : "text-[#27A7E7] hover:text-blue-300"
                  } font-bold text-sm inline-flex items-center`}
                >
                  <svg
                    className={`w-7 mr-2 ${
                      telegramStatus.isConnected
                        ? "text-blue-300"
                        : "text-blue-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.507 8.146l-1.925 9.09c-.144.662-.54.827-1.093.515L10.45 14.61l-1.88 1.815c-.207.207-.38.38-.777.38l.28-3.334 6.637-5.998c.289-.251-.063-.39-.447-.139l-8.2 5.161-3.535-1.106c-.767-.238-.78-.768.16-1.13l13.812-5.325c.639-.243 1.194.158.99 1.126z" />
                  </svg>
                  {telegramStatus.isConnected
                    ? "✓ Connected To Telegram"
                    : "Connect Telegram"}
                </span>
              </button>
            </div>
          </section>

          {/* <section className="py-2">
            <label className="flex items-center gap-2 block text-sm text-gray-300 mb-2">
              WhatsApp Number
              <WhatsappInstructions />
            </label>
            <PhoneInput
              international={true}
              countryCallingCodeEditable={false}
              defaultCountry="US"
              placeholder="Enter whatsApp number"
              value={
                formData.whatsapp_no ? `+${formData.whatsapp_no}` : undefined
              }
              onChange={(value) => {
                if (value) {
                  let updatedValue = value.replace("+", "").trim();
                  setFormData((prev) => ({
                    ...prev,
                    whatsapp_no: updatedValue,
                  }));
                  setWhatsappStatus((prev) => ({
                    ...prev,
                    isModified: updatedValue !== data?.whatsapp_no,
                  }));
                }
              }}
            />

            <div className="mt-4 flex justify-center">
              <button
                className={`border ${
                  whatsappStatus.isConnected
                    ? "border-green-500 text-green-300 cursor-not-allowed"
                    : "border-[#25d366] hover:border-green-300"
                } ${
                  whatsappStatus.isChecking ? "opacity-75 cursor-wait" : ""
                } rounded-lg px-2 py-2`}
                onClick={handleConnectWhattsapp}
                disabled={whatsappStatus.isConnected}
              >
                <span
                  className={`${
                    whatsappStatus.isConnected
                      ? "text-green-500"
                      : "text-[#25d366] hover:text-green-300"
                  } font-bold text-sm inline-flex items-center`}
                >
                  <svg
                    className="w-8 mr-2 text-[#25d366]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                  </svg>
                  {whatsappStatus.isConnected
                    ? "✓ Connected to WhatsApp"
                    : "Connect to WhatsApp"}
                </span>
              </button>
            </div>
          </section> */}

          <QRCodeModal
            isOpen={telegramStatus.isModalOpen || whatsappStatus.isModalOpen}
            qrType={
              telegramStatus.isModalOpen
                ? "telegram"
                : whatsappStatus.isModalOpen
                ? "whatsapp"
                : ""
            }
            onClose={() => {
              setTelegramStatus((prev) => ({ ...prev, isModalOpen: false }));
              setWhatsappStatus((prev) => ({ ...prev, isModalOpen: false }));
            }}
          />

          <button
            className="w-full mt-4 bg-gradient-to-r from-[#B039FF] to-[#A871FF] text-white py-2 px-2 rounded-md hover:opacity-90 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center"
            disabled={finalLoading}
            onClick={handleSubmit}
          >
            {finalLoading ? "Redirecting..." : "Go to Dashboard"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SetupCommunication;
