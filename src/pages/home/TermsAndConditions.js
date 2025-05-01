import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const TermsAndConditions = () => {
  return (
    <>
    <Header/>
    <div className="privacy_bg min-h-screen p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-semibold">Terms of Use</h1>
          <div className="px-4 py-2 bg-[#1F0034] border border-[#B039FF] rounded text-base">
            Effective Date: February 10, 2025
          </div>
        </div>

        {/* Welcome Section */}
        <div className="space-y-8">
          <div className="mb-8">
            <h2 className="text-[#B039FF] text-2xl md:text-3xl mb-4">Welcome to Tradexpert.ai</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              By accessing or using our website, services, or tools, you agree to abide by these Terms of Use ("Terms"). Please read them carefully. If you do not agree to these Terms, do not use our platform.
            </p>
          </div>

          {/* Acceptance Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">1. Acceptance of Terms</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              By accessing or using Tradexpert.ai, you agree to be bound by these Terms, our Privacy Policy, and any additional terms or guidelines we may introduce. We reserve the right to update these Terms at any time.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">2. Our Services</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              Tradexpert.ai is a market analysis and AI-powered educational platform providing tools and insights to assist users with trading decisions. We do not provide financial, investment, or brokerage advice and do not act as a financial advisor, broker, or regulatory entity.
            </p>
          </div>

          {/* Eligibility Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">3. User Eligibility</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">You must be:</p>
            <ul className="list-disc pl-8 mt-3 text-base md:text-lg opacity-90 space-y-2">
              <li>At least 18 years old or the legal age in your jurisdiction</li>
              <li>Responsible for the accuracy of the information you provide</li>
            </ul>
          </div>

          {/* Responsibilities Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">4. User Responsibilities</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">By using our platform, you agree to:</p>
            <ul className="list-disc pl-8 mt-3 text-base md:text-lg opacity-90 space-y-2">
              <li>Use the platform only for lawful purposes</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Avoid unauthorized access or tampering with platform features</li>
              <li>Not misuse, copy, or reverse engineer any part of our platform</li>
              <li>You are solely responsible for your trading decisions</li>
            </ul>
          </div>

          {/* Disclaimer Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              Tradexpert.ai is provided "as is" and "as available" without warranties of any kind.
            </p>
            <ul className="list-disc pl-8 mt-3 text-base md:text-lg opacity-90 space-y-2">
              <li>We make no guarantees regarding the accuracy, reliability, or timeliness of data tools</li>
              <li>We do not guarantee profits, success, or performance. Trading involves risk of financial loss</li>
            </ul>
          </div>

          {/* Liability Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">6. Limitation of Liability</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-8 mt-3 text-base md:text-lg opacity-90 space-y-2">
              <li>Tradexpert.ai will not be liable for any direct, indirect, incidental, or consequential losses arising from the use of our platform</li>
              <li>This includes, but is not limited to, loss of profits, data, or business opportunities</li>
            </ul>
          </div>

          {/* Compliance Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">7. Compliance and Regulatory Status</h2>
            <ul className="list-disc pl-8 text-base md:text-lg opacity-90 space-y-2">
              <li>Tradexpert.ai is not registered with any financial regulatory authorities globally, including SEBI, SEC, FINRA, or other equivalent bodies</li>
              <li>Use of the platform is strictly for educational and informational purposes</li>
            </ul>
          </div>

          {/* Termination Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">8. Termination</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              We reserve the right to suspend or terminate your account without notice if you violate these Terms.
            </p>
          </div>

          {/* Governing Law Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">9. Governing Law</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              These Terms are governed by and interpreted under the laws of California, USA, without regard to conflicts of laws principles.
            </p>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">10. Contact Us</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              For inquiries regarding these Terms, please contact us:<br />
              Email: <a href="mailto:support@tradexpert.ai" className="text-[#B039FF] hover:underline">support@tradexpert.ai</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default TermsAndConditions;