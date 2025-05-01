import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../../../utils/axiosHelper";
import { toastStyles } from "../../../utils";

export default function RequestDemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    email: "",
    preffered_date_time: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateTimeRef = useRef(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Please enter your name.", toastStyles);
    }
    if (!formData.phone_no.trim()) {
      return toast.error("Please enter your phone number.", toastStyles);
    }
    if (!/^\d{10,}$/.test(formData.phone_no)) {
      return toast.error("Please enter a valid phone number.", toastStyles);
    }
    if (!formData.email.trim()) {
      return toast.error("Please enter your email.", toastStyles);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Please enter a valid email address.", toastStyles);
    }
    if (!formData.preffered_date_time.trim()) {
      return toast.error("Please select a preferred date and time.", toastStyles);
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your request...", toastStyles);

    try {
      await axiosInstance.post("user/requestdemo", formData);

      toast.success("Submitted successfully!", { id: toastId, ...toastStyles });

      setFormData({
        name: "",
        phone_no: "",
        email: "",
        preffered_date_time: "",
        message: "",
      });

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Submission failed", { id: toastId, ...toastStyles });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[linear-gradient(359.93deg,_#220C39_-10.38%,_#6C4984_99.93%)] rounded-3xl border border-[#B039FF] shadow-xl p-4 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-3 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-[linear-gradient(180deg,_rgba(255,255,255,0.68)_0%,_rgba(255,255,255,0.34)_100%)] transition"
        >
          <div className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 rounded-full border-[3px] border-[#220C39] bg-transparent">
            <X className="w-3 h-3 sm:w-4 sm:h-4 font-bold text-[#220C39]" />
          </div>
        </button>

        <h2 className="text-xl font-bold mb-6 text-white text-center font-euclid"></h2>

        <form className="space-y-4 px-4" onSubmit={handleSubmit}>
          {[
            { name: "name", label: "Name", type: "text", placeholder: "Enter your Name" },
            { name: "email", label: "Email Id", type: "email", placeholder: "Enter your Email Id" },
            { name: "phone_no", label: "Phone No.", type: "text", placeholder: "Enter your Phone No." },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-white font-regular font-euclid mb-1 text-sm">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full bg-[#270D42] font-regular font-euclid text-sm border border-[#B039FF] text-white rounded-lg px-4 py-2 focus:outline-none placeholder:italic placeholder:font-euclid placeholder:text-[#653895]"
              />
            </div>
          ))}

          <div>
            <label className="block text-white font-regular font-euclid mb-1 text-sm">Purpose of Connect</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your purpose..."
              rows="3"
              className="w-full bg-[#270D42] font-regular font-euclid text-sm border border-[#B039FF] text-white rounded-lg px-4 py-2 focus:outline-none resize-none placeholder:italic placeholder:font-euclid placeholder:text-[#653895]"
            ></textarea>
          </div>

          <div>
            <label className="block text-white font-regular font-euclid mb-1 text-sm">Preferred Date & Time</label>
            <div onClick={() => dateTimeRef.current?.showPicker()}>
              <input
                ref={dateTimeRef}
                type="datetime-local"
                name="preffered_date_time"
                value={formData.preffered_date_time}
                onChange={handleChange}
                className="w-full cursor-pointer bg-[#270D42] font-regular font-euclid text-sm border border-[#B039FF] text-white rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="py-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[linear-gradient(90deg,_#B039FF_0%,_#6A11CB_100%)] font-euclid text-white font-regular py-2 rounded-lg hover:opacity-90"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
