import React, { useState, useEffect } from "react";
import { Info, X } from "lucide-react";

const WhatsappInstructions = () => {
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <section className="relative">
      <button
        onClick={handleOpen}
        className="inline-flex items-center mt-2 text-sm text-gray-400 hover:text-gray-300"
        aria-label="Open instructions"
      >
        <Info className="w-4 h-4 mr-1" />
        Instructions
      </button>

      {isOpen && (
        <dialog
          open
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
          aria-modal="true"
        >
          <article
            className="bg-[#1A1625] border border-[#6A11CB] rounded-lg p-6 max-w-md mx-4 relative"
            onClick={(e) => e.stopPropagation()}
            aria-labelledby="modal-heading"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
              aria-label="Close instructions"
            >
              <X className="w-5 h-5" />
            </button>

            <h2
              id="modal-heading"
              className="text-lg font-semibold text-white mb-4"
            >
              Instructions for Connecting to Our WhatsApp Bot
            </h2>

            <div className="space-y-3 text-gray-300 text-sm">
              <section className="space-y-1">
                <h3 className="font-medium">
                  1. Click on the "Connect" Button:
                </h3>
                <p className="ml-4">
                  • This will redirect you to WhatsApp, where you will see two
                  options:
                </p>
                <p className="ml-4">• Open in Web or Open in App.</p>
              </section>

              <section className="space-y-1">
                <h3 className="font-medium">
                  2. Choose Your Preferred Option:
                </h3>
                <p className="ml-4">
                  • Open in Web: Redirects you to WhatsApp Web (requires you to
                  be logged in)
                </p>
                <p className="ml-4">
                  • Open in App: Launches the WhatsApp app on your device.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-medium">3. Start the Bot:</h3>
                <p className="ml-4">
                  • A Twilio bot chat will open. In the chatbox, type: join
                  arrange-spoken and send it to connect with the bot.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-medium">4. Complete the Connection:</h3>
                <p className="ml-4">
                  • Once the bot responds, you will be successfully connected to
                  Twilio via WhatsApp.
                </p>
                <p className="ml-4">
                  • You will now receive live signals and updates on WhatsApp.
                </p>
              </section>
            </div>

            <footer className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className="bg-[#6A11CB] hover:bg-[#5a0cb0] text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Got it
              </button>
            </footer>
          </article>
        </dialog>
      )}
    </section>
  );
};

export default WhatsappInstructions;
