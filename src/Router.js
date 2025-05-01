import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Loading from "./components/Loading";
import { SEO_DATA } from "./utils/constants";
const Dashboard = lazy(() => import("./pages/dashboard/DashboardV2"));
const DetailedNews = lazy(() => import("./pages/news/DetailNews"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/home/Login"));
const SignUp = lazy(() => import("./pages/home/SignUp"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const ConfirmOtp = lazy(() => import("./pages/home/ConfirmOtp"));
const UserDashboard = lazy(() => import("./pages/dashboard/UserDashboard"));
const Learning = lazy(() => import("./pages/learning_platform/Learning"));
const Price = lazy(() => import("./pages/pricing/Price"));
const PaymentForm = lazy(() => import("./pages/pricing/PaymentForm"));
const News = lazy(() => import("./pages/news/News"));
const FAQSection = lazy(() => import("./pages/faq/FAQSection"));
const AboutUs = lazy(() => import("./pages/about-us/AboutUs"));
const Feature = lazy(() => import("./pages/feature/Feature"));
const StrategyCategoryList = lazy(() =>
  import("./pages/dashboard/strategy/StrategyCategoryList")
);
/* const WhatsNewToday = lazy(() => import("./pages/dashboard/WhatsNewToday")); */
const WhatsNewToday = lazy(() => import("./pages/dashboard/whatsnewtodayV2/WhatsNew"));
const MarketScreener = lazy(() => import("./pages/dashboard/MarketScreenerV2"));
/* const CustomStrategy = lazy(() => import("./pages/dashboard/CustomStrategyV2")); */
const Strategy = lazy(() => import("./pages/dashboard/strategy/Strategy"));
const DashConfiguration = lazy(() => import("./pages/dashboard/Configuration"));
const Profile = lazy(() => import("./pages/dashboard/MyProfile"));
const Plan = lazy(() => import("./pages/dashboard/MyPlan"));
const TermsAndConditions = lazy(() =>
  import("./pages/home/TermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("./pages/home/PrivacyPolicy"));
const ContactUs = lazy(() => import("./pages/dashboard/SupportContact"));
const SetupCommunication = lazy(() =>
  import("./pages/home/SetupCommunication")
);
const ScrollToTop = lazy(() => import("./pages/home/ScrollToTop"));
const Configuration = lazy(() => import("./pages/signup-configuration/Main"));
const ExpertAdvice = lazy(() => import("./pages/expertadvice/ExpertAdvice"));

const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return null;
};

function Router() {
  const location = useLocation();
  const pageSeo = useMemo(
    () =>
      SEO_DATA[location.pathname.replace("/", "") || "home"] ||
      SEO_DATA["home"],
    [location.pathname]
  );

  useEffect(() => {
    const metaTags = {
      title: { tag: document.title, content: pageSeo.title },
      'meta[name="title"]': { content: pageSeo.title },
      'meta[name="description"]': { content: pageSeo.description },
      'meta[name="keywords"]': { content: pageSeo.keywords.join(", ") },
    };

    document.title = pageSeo.title;
    Object.entries(metaTags).forEach(([selector, values]) => {
      if (selector === "title") return;
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", values.content);
      }
    });
  }, [pageSeo]);

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
      <Routes>
        <Route element={<Header />} path="/header"></Route>
        <Route element={<Footer />} path="/footer"></Route>
        <Route
          element={<TermsAndConditions />}
          path="/terms-and-conditions"
        ></Route>
        <Route element={<PrivacyPolicy />} path="/privacy-policy"></Route>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login"></Route>
        <Route element={<SignUp />} path="/signup"></Route>
        <Route element={<ForgotPassword />} path="/forgot-password"></Route>
        <Route element={<ResetPassword />} path="/reset-password"></Route>
        <Route element={<ConfirmOtp />} path="/confirm-otp"></Route>
        <Route element={<UserDashboard />} path="/dashboard"></Route>

        <Route path="/dashboard" element={<UserDashboard />}>
          <Route index element={<Dashboard />} />
          <Route element={<WhatsNewToday />} path="whatsnewtoday"></Route>
          <Route element={<WhatsNewToday />} path="whatsnewtoday"></Route>
          <Route element={<DashConfiguration />} path="configure"></Route>
          <Route element={<ExpertAdvice />} path="expertadvice"></Route>
          <Route element={<Profile />} path="profile"></Route>
          <Route element={<ContactUs />} path="contactus"></Route>
          <Route element={<MarketScreener />} path="marketscreener"></Route>
          <Route element={<Strategy />} path="customstrategy"></Route>
          <Route element={<Plan />} path="plan"></Route>
          <Route element={<ContactUs />} path="support"></Route>
        </Route>
        <Route element={<Learning />} path="/learning"></Route>
        <Route element={<Price />} path="/pricing"></Route>
        <Route element={<PaymentForm />} path="/billing"></Route>
        <Route element={<Configuration />} path="/signup-configuration" />
        <Route element={<News />} path="/news" />
        <Route element={<FAQSection />} path="/faq" />
        <Route element={<AboutUs />} path="/about-us" />
        <Route element={<Feature />} path="/feature" />
        <Route element={<SetupCommunication />} path="/setup"></Route>
        <Route element={<DetailedNews />} path="/news-details/:title" />
        <Route
          element={<StrategyCategoryList />}
          path="/strategy/:category"
        ></Route>
        <Route path="*" element={<RedirectToHome />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
