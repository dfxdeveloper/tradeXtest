import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import { toast, Toaster } from "react-hot-toast";
import { Info } from "lucide-react";
import { useUserCredentials } from "../../components/context/user";
import axiosInstance from "../../utils/axiosHelper";
import QRCodeModal from "../../components/modal/QRCodeModal";

const ConnectChannelsModal = ({ isOpen, onClose }) => {
  const { data, refreshUserData } = useUserCredentials();
  const navigate = useNavigate();
  const [connected, setConnected] = useState({
    telegram: false,
    whatsapp: false,
  });
  const [modal, setModal] = useState({
    telegram: false,
    whatsapp: false,
  });
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);

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

  const checkTelegramConnection = async () => {
    let attempts = 0;
    const maxAttempts = 30;

    const checkInterval = setInterval(async () => {
      if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        setIsCheckingConnection(false);
        return;
      }

      try {
        const updatedData = await refreshUserData();
        if (updatedData?.user?.telegram_chat_id) {
          clearInterval(checkInterval);
          setConnected((prev) => ({ ...prev, telegram: true }));
          setIsCheckingConnection(false);
          toast.success("Telegram connected successfully!", toastStyles);
        }
      } catch (error) {
        console.error("Error checking telegram connection:", error);
      }

      attempts++;
    }, 5000);

    return () => clearInterval(checkInterval);
  };

  const handleTelegramConnect = () => {
    setModal((prev) => ({ ...prev, telegram: true }));
    setIsCheckingConnection(true);
    checkTelegramConnection();
  };

  const handleWhatsAppConnect = () => {
    setModal((prev) => ({ ...prev, whatsapp: true }));
    setConnected((prev) => ({ ...prev, whatsapp: true }));
  };

  const handleSubmit = async () => {
    if (!data.telegram_chat_id) {
      toast.error("Please connect Telegram first", toastStyles);
      return;
    }

    await axiosInstance.put(`user/update`, {
      is_first_visit: false,
    });
    await refreshUserData();

    toast.success("Login Successful!", toastStyles);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  useEffect(() => {
    return () => {
      setIsCheckingConnection(false);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="mdl-bg fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
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
          Connect Your Channels
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <button
              onClick={handleTelegramConnect}
              disabled={isCheckingConnection || data?.telegram_chat_id}
              className={`w-full py-3 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center gap-2 ${
                data?.telegram_chat_id
                  ? "bg-green-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white ${
                isCheckingConnection ? "opacity-75 cursor-wait" : ""
              }`}
            >
              {isCheckingConnection ? (
                "Checking connection..."
              ) : data?.telegram_chat_id ? (
                <>
                  <span>✓</span>
                  Connected to Telegram
                </>
              ) : (
                "Connect to Telegram"
              )}
            </button>

            <div className="flex justify-center">
              <div className="group inline-block relative">
                <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  <Info size={16} />
                  Instructions
                </button>
                <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 z-50">
                  <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg text-sm">
                    <div className="space-y-3">
                      <h4 className="font-semibold">How to Connect:</h4>
                      <ol className="space-y-2">
                        <li>1. Click the "Connect to Telegram" button above</li>
                        <li>2. You'll be redirected to Telegram</li>
                        <li>
                          3. Click on the /start button in the chat with the bot
                          to initiate the connection
                        </li>
                        <li>
                          4. Follow the prompt to "Accept Notifications" to
                          enable updates and stay connected.
                        </li>
                        <li>
                          5. Once you've accepted notifications, your connection
                          to the bot will be successfully established
                        </li>
                      </ol>
                    </div>
                    <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-[94%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleWhatsAppConnect}
              className={`w-full py-3 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center gap-2 ${
                connected.whatsapp
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {connected.whatsapp ? (
                <>
                  <span>✓</span>
                  Connected to WhatsApp
                </>
              ) : (
                "Connect to WhatsApp"
              )}
            </button>

            <div className="flex justify-center">
              <div className="group inline-block relative">
                <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  <Info size={16} />
                  Instructions
                </button>
                <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 z-50">
                  <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg text-sm">
                    <div className="space-y-3">
                      <h4 className="font-semibold">How to Connect:</h4>
                      <ol className="space-y-2">
                        <li>1. Click the "Connect to WhatsApp" button above</li>
                        <li>2. Choose "Open in Web" or "Open in App"</li>
                        <li>3. In the chat, type: join arrange-spoken</li>
                        <li>4. Send the message to connect</li>
                        <li>
                          5. Once the bot responds, you will be successfully
                          connected to Twilio via WhatsApp
                        </li>
                      </ol>
                    </div>
                    <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-[94%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="w-32 bg-gradient-to-r from-[#B039FF] to-[#A871FF] text-white py-2 px-4 rounded-md hover:opacity-90 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Submit
            </button>
          </div>
        </div>

        <QRCodeModal
          isOpen={modal.telegram || modal.whatsapp}
          qrType={
            modal.telegram ? "telegram" : modal.whatsapp ? "whatsapp" : ""
          }
          onClose={() =>
            setModal((prev) => ({ ...prev, telegram: false, whatsapp: false }))
          }
        />
      </div>
    </div>
  );
};

export default ConnectChannelsModal;
