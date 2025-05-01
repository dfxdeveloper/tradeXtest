import React from "react";
import { Link } from "react-router-dom";
import tradeXlogo from "../assets/icons/tradeXlogo.svg";

function Footer() {
  const LegalSection = () => (
    <div>
      <h2 className="text-base sm:text-lg font-bold font-[GILROY] mb-3">
        Legal & Compliance
      </h2>
      <p className="text-sm sm:text-base mb-4 footer_text">
        Tradexpert is an educational and analytical tools only. We do not offer
        financial advice, brokerage services, or trading recommendations. All
        decisions made using our platform are at the sole discretion and
        responsibility of the user.
      </p>
      <div className="mb-3">
        <h3 className="text-sm sm:text-base font-bold font-[GILROY] mb-2">
          Regulatory Note
        </h3>
        <p className="text-sm sm:text-base mb-4 footer_text">
          Tradexpert.ai is not registered with any financial regulatory
          authority, including SEBI, SEC, or FINRA.
        </p>
        <ul className="text-sm sm:text-base mb-4 footer_text">
          <li>
            • No Regulatory Registration: Use of this platform does not
            constitute financial advisory services.
          </li>
          <li>
            • Risk Disclosure: Trading involves risk. Past performance does not
            guarantee future results.
          </li>
        </ul>
      </div>
      <p className="text-sm sm:text-base mb-4 footer_text">
        By using Tradexpert, you agree to our{" "}
        <Link
          to="/terms-and-conditions"
          className="text-[#B039FF] underline hover:text-purple-400"
        >
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy-policy"
          className="text-[#B039FF] underline hover:text-purple-400"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
  return (
    <footer className="bg-[#020204] bg-gradient-to-b from-[#020204] via-[#0f0117] to-[#AE42FF57] text-white py-8 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-4">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link to="/" className="block">
              <img
                src={tradeXlogo}
                alt="TradeXpert"
                className="w-36 sm:w-48 mb-6"
                loading="lazy"
              />
            </Link>
            <p className="text-sm sm:text-base mb-4 footer_text">
              Tradexpert is a trusted space to master the markets with
              confidence and clarity. Our platform combines expert analysis with
              state-of-the-art charting tools, real-time data, and a
              collaborative trading community—all crafted to support both
              beginners and professionals.
            </p>
            <p className="text-[#B039FF] text-md sm:text-base mb-4 footer_italictext">
              We focus on delivering insightful market analysis rather than
              trading tips, empowering you to make decisions that align with
              your goals.
            </p>
            <p className="text-sm sm:text-base mb-6 footer_text">
              Join millions who rely on Tradexpert to explore innovative
              strategies, uncover new opportunities, and achieve sustainable
              financial growth. Discover the potential within the markets and
              let Tradexpert elevate your trading experience.
            </p>
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-bold font-[GILROY] mb-3">
                Stay Connected
              </h3>
              <p className="text-sm sm:text-base mb-6 footer_text">
                Stay updated with the latest tools, market insights, and
                platform news.
              </p>
              <div className="flex gap-3 lg:py-10">
                {/* Social Media Icons */}
                <Link
                  to="https://www.facebook.com/share/155ca9Eyng/?mibextid=wwXIfr"
                  className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-[#B039FF] group transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-[#020204] group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link
                  to="https://www.linkedin.com/company/tradexpert1/"
                  className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-[#B039FF] group transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-[#020204] group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                <Link
                  to="https://x.com/tradexpert69054?s=21"
                  className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-[#B039FF] group transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-[#020204] group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link
                  to="https://www.instagram.com/tradexpert.ai?igsh=YXo4Z3poNmczbHNq"
                  className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-[#B039FF] group transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-[#020204] group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 lg:col-span-2 lg:px-4 font-[GILROY]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 font-bold">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  to="/about-us"
                  className="hover:text-purple-400 transition-colors"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-purple-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/learning"
                  className="hover:text-purple-400 transition-colors"
                >
                  Learning
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="hover:text-purple-400 transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/hidden-insights"
                  className="hover:text-purple-400 transition-colors"
                >
                  Hidden Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="hover:text-purple-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-purple-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="sm:col-span-1 lg:col-span-5">
            <h2 className="text-base sm:text-lg font-bold font-[GILROY] mb-3">
              Contact Us
            </h2>
            <ul className="space-y-3 text-sm sm:text-base footer_text">
              <li className="flex items-center gap-2">
                <div className="bg-white rounded-full p-1.5 sm:p-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#020204]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="break-all">Email: support@tradexpert.ai</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-white rounded-full p-1.5 sm:p-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#020204]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                Phone: +91 9607053478
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-white rounded-full p-1.5 sm:p-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#020204]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                Headquarters: San Francisco, California, USA
              </li>
            </ul>
            {/* Legal Section for Desktop */}
            <div className="hidden md:hidden lg:block py-10">
              <LegalSection />
            </div>
          </div>
        </div>

        {/* Legal Section for Tablet */}
        <div className="sm:block lg:hidden mt-8 pt-8 border-t border-gray-700">
          <LegalSection />
        </div>
        {/* Legal & Compliance Section */}
        {/*     <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-[GILROY] mb-3">Legal & Compliance</h2>
              <p className="text-sm sm:text-base mb-4 footer_text">
                Tradexpert is an educational and analytical tools only. We do not offer financial advice, brokerage services, or trading recommendations. All decisions made using our platform are at the sole discretion and responsibility of the user.
              </p>
              <div className="mb-3">
                <h3 className="text-sm sm:text-base font-bold font-[GILROY] mb-2">Regulatory Note</h3>
                <p className="text-sm sm:text-base mb-4 footer_text">
                  Tradexpert.ai is not registered with any financial regulatory authority, including SEBI, SEC, or FINRA.
                </p>
                <ul className="text-sm sm:text-base mb-4 footer_text">
                  <li>• No Regulatory Registration: Use of this platform does not constitute financial advisory services.</li>
                  <li>• Risk Disclosure: Trading involves risk. Past performance does not guarantee future results
                    .</li>
                </ul>
              </div>
              <p className="text-sm sm:text-base mb-4 footer_text">
                By using Tradexpert, you agree to our <Link to="/terms" className="text-[#B039FF] underline hover:text-purple-400">Terms of Use</Link> and{" "}
                <Link to="/privacy" className="text-[#B039FF] underline hover:text-purple-400">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div> */}

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm sm:mb-0 text-sm sm:text-base mb-4 footer_text">
              Your gateway to AI-powered, data-driven trading innovation.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm sm:text-base footer_text">
                © 2025 Tradexpert. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
