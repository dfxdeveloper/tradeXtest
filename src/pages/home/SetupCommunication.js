import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import axiosInstance from "../../utils/axiosHelper";
import { AuthContext } from "../../components/context/auth";
import ConnectChannelsModal from "./ConnectChannelsModal";
import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import { useUserCredentials } from "../../components/context/user";

const SetupCommunicationModal = ({ isOpen, onClose }) => {
  const { refreshUserData } = useUserCredentials();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    telegram_no: "",
    whatsapp_no: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [activeModal, setActiveModal] = useState("setup");

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
    if (isOpen) {
      setFormData({
        telegram_no: "",
        whatsapp_no: "",
      });
      setActiveModal("setup");
    }
  }, [isOpen]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (!(formData.telegram_no || formData.whatsapp_no)) {
        const response = await axiosInstance.put(`user/update`, {
          is_first_visit: false,
        });
        await refreshUserData();
        if (response) {
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
          return;
        }
      }

      if (
        formData.telegram_no &&
        !isValidPhoneNumber(`+${formData.telegram_no}`)
      )
        throw new Error("Please enter a valid Telegram number");

      if (
        formData.whatsapp_no &&
        !isValidPhoneNumber(`+${formData.whatsapp_no}`)
      )
        throw new Error("Please enter a valid WhatsApp number");

      await axiosInstance.put("user/update", {
        telegram_no: formData.telegram_no,
        whattsapp_no: formData.whatsapp_no,
      });
      await refreshUserData();

      const updatedAuthData = {
        ...authData,
        user: {
          ...authData.user,
          telegram_no: formData.telegram_no,
          whattsapp_no: formData.whatsapp_no,
        },
      };

      setAuthData(updatedAuthData);
      setActiveModal("connect");
    } catch (error) {
      console.error("Error updating communication numbers:", error);
      toast.error(
        error.message || "Failed to update communication numbers",
        toastStyles
      );
    } finally {
      setIsSaving(false);
    }
  };
  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <>
      {activeModal === "setup" && (
        <div
          className="mdl-bg fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onMouseDown={handleMouseDown}
        >
          <div
            className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative"
            onMouseDown={handleMouseDown}
          >
            <Toaster position="top-center" />
            {/*   <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button> */}

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

            <form onSubmit={handleSaveChanges} className="space-y-6">
              <div className="py-3 sm:py-4">
                <label className="block text-[#FCFCFC] font-medium mb-2">
                  Telegram Number
                </label>
                <div className="flex gap-2">
                  <PhoneInput
                    international={true}
                    countryCallingCodeEditable={false}
                    defaultCountry="US"
                    placeholder="Enter telegram number"
                    value={
                      formData.telegram_no
                        ? `+${formData.telegram_no}`
                        : undefined
                    }
                    onChange={(value) => {
                      if (value) {
                        let updatedValue = value.replace("+", "").trim();
                        setFormData((prev) => ({
                          ...prev,
                          telegram_no: updatedValue,
                        }));
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#FCFCFC] font-medium mb-2">
                  WhatsApp Number
                </label>
                <div className="flex gap-2">
                  <PhoneInput
                    international={true}
                    countryCallingCodeEditable={false}
                    defaultCountry="US"
                    placeholder="Enter WhatsApp number"
                    value={
                      formData.whatsapp_no
                        ? `+${formData.whatsapp_no}`
                        : undefined
                    }
                    onChange={(value) => {
                      if (value) {
                        let updatedValue = value.replace("+", "").trim();
                        setFormData((prev) => ({
                          ...prev,
                          whatsapp_no: updatedValue,
                        }));
                      }
                    }}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-300">
                *Both fields are optional. <br />
                You can proceed without filling them.
              </p>

              <div className="pb-5">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-[#B039FF] to-[#A871FF] text-white py-2 px-2 rounded-md hover:opacity-90 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center"
                >
                  {isSaving ? "Submitting..." : "NEXT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === "connect" && (
        <ConnectChannelsModal
          isOpen={true}
          onClose={() => {
            setActiveModal("setup");
            onClose();
          }}
        />
      )}
    </>
  );
};

export default SetupCommunicationModal;
