import React from "react";
import qrTelegram from "../../assets/images/qr_telegram.png";
import qrWhatsapp from "../../assets/images/qr_whatsapp.png";
import qrModalCloseIcon from "../../assets/icons/qr_modal_close_icon.svg";

const QRCodeModal = ({ isOpen, onClose, qrType }) => {
  if (!isOpen) return null;

  const whatsappSteps = [
    "1. Open Your Phone's Camera.",
    "2. Scan the QR Code displayed here.",
    "3. Tap the Link that appears to open WhatsApp.",
    `4. Send the Pre-filled "Join" Message.`,
  ];

  const telegramSteps = [
    "1.	Open Telegram App.",
    "2.	Scan the QR Code using the Telegram camera or your device’s camera.",
    `3.	Tap "Join" to connect.`,
  ];

  const steps =
    qrType === "whatsapp"
      ? whatsappSteps
      : qrType === "telegram"
      ? telegramSteps
      : [];
  const channelName =
    qrType === "whatsapp"
      ? "WhatsApp"
      : qrType === "telegram"
      ? "Telegram"
      : "";
  const buttonText = `${channelName} channel link`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="relative w-full max-w-4xl shadow-[0_0_0_2px_#AD4AFF,0_0_0_4px_#2575FC] rounded-2xl bg-[radial-gradient(90%_116%_at_50%_0%,_rgba(168,113,255,0.4)_0%,_#0E051B_100%)]"
        style={{
          background:
            "linear-gradient(90.06deg, rgba(255, 255, 255, 0.44) -46.6%, rgba(255, 255, 255, 0) 147.52%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <img src={qrModalCloseIcon} alt="close" loading="lazy" />
        </button>

        <div className="flex p-8">
          <div className="flex flex-col items-center w-1/2 border-r border-[#FFFFFF1A] pr-8">
            <div className="bg-white p-4 rounded-lg mb-4 relative">
              <img
                src={
                  qrType === "whatsapp"
                    ? qrWhatsapp
                    : qrType === "telegram"
                    ? qrTelegram
                    : ""
                }
                alt="QR Code"
                loading="lazy"
                className="w-64 h-64"
              />
            </div>
            <p> OR </p>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white mt-3 py-3 px-6 rounded-md w-full max-w-xs transition duration-200 mb-2"
              onClick={() =>
                qrType === "whatsapp"
                  ? window.open(
                      "http://wa.me/+13462205745?text=join%20arrange-spoken",
                      "_blank"
                    )
                  : qrType === "telegram"
                  ? window.open(
                      "https://t.me/TrendXAI_Bot?start=connect",
                      "_blank"
                    )
                  : null
              }
            >
              {buttonText}
            </button>
            <p className="text-sm text-gray-400 text-center">
              Click this button to open the {channelName} channel in a new tab.
            </p>
          </div>

          <div className="flex flex-col justify-center pl-8 w-1/2">
            <p className="font-poppins font-semibold text-xl leading-snug tracking-normal text-[#BE82FF] mb-6">
              Follow these steps for {channelName} Connection
            </p>
            <div className="space-y-4 text-left text-white">
              {steps.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
