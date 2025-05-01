import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
    <Header/>
    <div className="privacy_bg min-h-screen p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-semibold">Privacy Policy</h1>
          <div className="px-4 py-2 bg-[#1F0034] border border-[#B039FF] rounded text-base">
            Effective Date: February 10, 2025
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-[#B039FF] text-xl md:text-2xl mb-4">
            Welcome to Tradexpert!
            </h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
               We respect your privacy and are committed
              to protecting your personal data. This Privacy Policy explains how
              we collect, use, and protect the information you provide when
              using our app and website.
            </p>
            <p className="text-base md:text-lg opacity-90 leading-relaxed mt-4">
              By using Tradexpert, you agree to the terms outlined in this
              Privacy Policy.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">
              1. Information We Collect
            </h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              We collect non-personal and limited personal data to enhance user
              experience, provide market insights, and improve app
              functionality.
            </p>

            <h3 className="text-[#FFFFFF] text-lg md:text-xl mt-6 mb-3">
              A. Data We Collect Automatically
            </h3>
            <ul className="list-none pl-8 text-base md:text-lg opacity-90 space-y-2">
              <li>
                ✅ Usage Data: App interactions, session time, and feature
                usage.
              </li>
              <li>
                ✅ Device Information: Device type, operating system, and IP
                address.
              </li>
              <li>
                ✅ Analytical Data: Data from Google Analytics, Firebase, and
                other analytics tools.
              </li>
            </ul>

            <h3 className="text-[#FFFFFF] text-lg md:text-xl mt-6 mb-3">
              B. Data You Provide (Optional)
            </h3>
            <ul className="list-none pl-8 text-base md:text-lg opacity-90 space-y-2">
              <li>
                ✅ Account Information: If you create an account, we may collect
                your name, email, and profile details.
              </li>
              <li>
                ✅ Watchlist & Preferences: Stocks, forex, or crypto you choose
                to track.
              </li>
            </ul>

            <h3 className="text-[#FFFFFF] text-lg md:text-xl mt-6 mb-3">
              What We DO NOT Collect:
            </h3>
            <ul className="list-none pl-8 text-base md:text-lg opacity-90 space-y-2">
              <li>❌ No financial transaction data</li>
              <li>❌ No personal trading account details</li>
              <li>❌ No brokerage or bank account information</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-none pl-8 text-base md:text-lg opacity-90 space-y-2">
              <li>
                ✔ Personalized Market Alerts – Custom stock, forex & crypto
                insights
              </li>
              <li>
                ✔ AI-Driven Recommendations – Tailored AI-generated market
                insights
              </li>
              <li>
                ✔ User Experience Optimization – Improving app performance &
                engagement
              </li>
              <li>
                ✔ Security & Compliance – Protecting user data & preventing
                fraud
              </li>
            </ul>
            <p className="text-base md:text-lg opacity-90 leading-relaxed mt-4">
              🚫 We DO NOT sell or share your personal data with third-party
              advertisers or brokers.
            </p>
          </div>

          {/* Data Security & Retention */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">
              3. Data Security & Retention
            </h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              We use encryption, SSL security protocols, and access controls to
              protect your data.
            </p>
            <p className="text-base md:text-lg opacity-90 leading-relaxed mt-4">
              📌 Your data is retained as long as you use our services. You can
              request deletion at any time.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">
              4. Third-Party Services & Integrations
            </h2>
            <ul className="list-none pl-8 text-base md:text-lg opacity-90 space-y-2">
              <li>
                ✅ We may use market data providers (e.g., Polygon.io, Zerodha
                Kite Connect, News API, CoinGecko, Forex APIs).
              </li>
              <li>
                ✅ Third-party services have their own privacy policies – we
                encourage users to review them.
              </li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">
              5. Your Rights (GDPR Compliance for EU Users)
            </h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              If you're a user from the European Union (EU), California (CCPA),
              or other privacy-regulated regions, you have the right to:
            </p>
            <ul className="list-none pl-8 mt-3 text-base md:text-lg opacity-90 space-y-2">
              <li>🔹 Request access to your data</li>
              <li>🔹 Ask for data correction or deletion</li>
              <li>🔹 Opt-out of analytics and notifications</li>
            </ul>
            <p className="text-base md:text-lg opacity-90 leading-relaxed mt-4">
              📌 To exercise these rights, contact us at:{" "}
              <a
                href="mailto:support@tradexpert.ai"
                className="text-[#B039FF] hover:underline"
              >
                support@tradexpert.ai
              </a>
            </p>
          </div>

          {/* Compliance Statement */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">
              6. Compliance Statement
            </h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              Tradexpert does NOT provide trading, brokerage, or investment
              advisory services. We are an informational and educational
              platform for AI-powered market intelligence.
            </p>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-[#FFFFFF] text-xl md:text-2xl mb-4">
              7. Contact Us
            </h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              For privacy-related inquiries:
              <br />
              📩 Email:{" "}
              <a
                href="mailto:support@tradexpert.ai"
                className="text-[#B039FF] hover:underline"
              >
                support@tradexpert.ai
              </a>
              <br />
              🌍 Website:{" "}
              <a
                href="https://tradexpert.ai"
                className="text-[#B039FF] hover:underline"
              >
                https://tradexpert.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default PrivacyPolicy;
