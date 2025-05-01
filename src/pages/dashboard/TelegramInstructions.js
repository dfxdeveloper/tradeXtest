import React, { useState } from "react";
import { Info, X } from "lucide-react";

const TelegramInstructions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsOpen(false);
  };

  // Close on escape key press
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="inline-flex items-center mt-2 text-sm text-gray-400 hover:text-gray-300"
      >
        <Info className="w-4 h-4 mr-1" />
        Instructions
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          {/* Modal Content */}
          <div
            className="bg-[#1A1625] border border-[#6A11CB] rounded-lg p-6 max-w-md mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-4">
              How to Connect to Our Telegram Bot
            </h3>

            {/* Instructions */}
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="space-y-1">
                <p className="font-medium">1. Click on the "Connect" Button:</p>
                <p className="ml-4">
                  • This will redirect you to the Telegram bot.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-medium">2. Start the Bot:</p>
                <p className="ml-4">
                  • Click on the /start button in the chat with the bot to
                  initiate the connection.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-medium">3. Accept Notifications:</p>
                <p className="ml-4">
                  • Follow the prompt to "Accept Notifications" to enable
                  updates and stay connected.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-medium">4. Connection Complete:</p>
                <p className="ml-4">
                  • Once you've accepted notifications, your connection to the
                  bot will be successfully established.
                </p>
              </div>
            </div>

            {/* Got it button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className="bg-[#6A11CB] hover:bg-[#5a0cb0] text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelegramInstructions;
