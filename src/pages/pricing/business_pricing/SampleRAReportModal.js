import React, { useState } from "react";
import { X } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../../../utils/axiosHelper";
import { toastStyles } from "../../../utils";

export default function SampleRAReportModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Please enter your name.", toastStyles);
    }
    if (!formData.email.trim()) {
      return toast.error("Please enter your email.", toastStyles);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Please enter a valid email address.", toastStyles);
    }
    if (!formData.phone_no.trim()) {
      return toast.error("Please enter your phone number.", toastStyles);
    }
    if (!/^\d{10,}$/.test(formData.phone_no)) {
      return toast.error("Please enter a valid phone number.", toastStyles);
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your request...", toastStyles);

    try {
      await axiosInstance.post("user/docsubmit", formData);

      toast.success("Submitted successfully! Downloading report...", {
        id: toastId,
        ...toastStyles,
      });

      const link = document.createElement("a");
      link.href = "/TradeXpertSampleRARationaleReport.pdf";
      link.download = "TradeXpert-Sample-RA-Rationale-Report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Submission failed", {
        id: toastId,
        ...toastStyles,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

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
        <h2 className="text-xl font-bold mb-6 text-white text-center font-euclid">
          Download Sample Report
        </h2>

        <form onSubmit={handleDownload} className="space-y-4 px-4">
          {[
            { name: "name", label: "Name", type: "text", placeholder: "Enter your Name" },
            { name: "email", label: "Email Id", type: "email", placeholder: "Enter your Email Id" },
            { name: "phone_no", label: "Phone No.", type: "text", placeholder: "Enter your Phone No." },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-white font-regular font-euclid mb-1 text-sm">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full bg-[#270D42] font-regular font-euclid text-sm border border-[#B039FF] text-white rounded-lg px-4 py-2 focus:outline-none placeholder:italic placeholder:text-[#653895]"
              />
            </div>
          ))}
          <div className="py-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[linear-gradient(90deg,_#B039FF_0%,_#6A11CB_100%)] font-euclid text-white font-regular py-2 rounded-lg hover:opacity-90"
            >
              {isSubmitting ? "Submitting..." : "Download Report"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
