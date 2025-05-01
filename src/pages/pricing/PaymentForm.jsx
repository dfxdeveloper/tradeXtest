import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../utils/axiosHelper";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useUserCredentials } from "../../components/context/user";
import { getCookie } from "../../services/cookie";
import Loading from "../../components/Loading";

function PaymentForm({ selectedPlan }) {
  const { data: user, refreshUserData } = useUserCredentials();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [billingAddress, setBillingAddress] = useState({});

  const updateUserSubscription = async (paymentIntent) => {
    try {
      const paymentHistory = [
        {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
          currency: paymentIntent.currency,
          description: paymentIntent.description,
          status: paymentIntent.status,
        },
        ...(user?.payment_history || []),
      ];

      await axiosInstance.put("user/update", {
        subscription: {
          subscription_id: selectedPlan.subscription_id,
          plan: selectedPlan.plan,
          duration: selectedPlan.duration,
          price: selectedPlan.price,
        },
        payment_history: paymentHistory,
      });

      await refreshUserData();
    } catch (error) {
      console.error("Error updating user subscription:", error);
      throw new Error(
        "An error occurred while updating your subscription. Please contact the support team for more information"
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setError("");
    setProcessing(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          receipt_email: user?.email,
          payment_method_data: {
            billing_details: {
              name: billingAddress.name,
              address: {
                line1: billingAddress.line1,
                city: billingAddress.city,
                state: billingAddress.state,
                postal_code: billingAddress.postal_code,
              },
            },
          },
        },
        redirect: "if_required",
      });

      if (error) throw error;

      if (paymentIntent?.status !== "succeeded")
        throw new Error(`Unexpected payment status: ${paymentIntent?.status}.`);

      await updateUserSubscription(paymentIntent);
      setBillingAddress({});
      const token = getCookie("token");
      if (token && !user?.is_first_visit) {
        navigate("/dashboard");
      } else {
        navigate("/signup-configuration");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      console.error("Payment error:", err);
    } finally {
      setProcessing(false);
    }
  };

  const handleBillingChange = (event) =>
    setBillingAddress({
      ...billingAddress,
      [event.target.name]: event.target.value,
    });

  return (
    <div className="w-full max-w-6xl mx-auto border border-[#6A11CB] bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-white">
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-xl font-base mb-2">Complete Payment</h2>
        <p className="text-lg sm:text-xl font-bold">
          Pay ${selectedPlan.price} for {selectedPlan.plan_name || "Basic Plan"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side (Form Section) */}
        <div className="w-full lg:w-1/2">
          <p className="text-md font-bold mb-6">
            Fill the details & get full access to all our features and benefits.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-[#FCFCFC] text-sm mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={billingAddress?.name || ""}
                  onChange={handleBillingChange}
                  className="w-full p-2 rounded-md bg-[#FFFFFF] text-[black] border border-[#EDEDED]"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-[#FCFCFC] text-sm mb-1">
                  Address line 1*
                </label>
                <input
                  type="text"
                  name="line1"
                  value={billingAddress?.line1 || ""}
                  onChange={handleBillingChange}
                  className="w-full p-2 rounded-md bg-[#FFFFFF] text-[black] border border-[#EDEDED]"
                  placeholder="Address line 1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-[#FCFCFC] text-sm mb-1">
                  City*
                </label>
                <input
                  type="text"
                  name="city"
                  value={billingAddress?.city || ""}
                  onChange={handleBillingChange}
                  className="w-full p-2 rounded-md bg-[#FFFFFF] text-[black] border border-[#EDEDED]"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-[#FCFCFC] text-sm mb-1">
                  State/Region*
                </label>
                <input
                  type="text"
                  name="state"
                  value={billingAddress?.state || ""}
                  onChange={handleBillingChange}
                  className="w-full p-2 rounded-md bg-[#FFFFFF] text-[black] border border-[#EDEDED]"
                  placeholder="Select state/region"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-[#FCFCFC] text-sm mb-1">
                  Zip/Postal code*
                </label>
                <input
                  type="text"
                  name="postal_code"
                  value={billingAddress?.postal_code || ""}
                  onChange={handleBillingChange}
                  className="w-full p-2 rounded-md bg-[#FFFFFF] text-[black] border border-[#EDEDED]"
                  placeholder="Zip/Postal code"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Side (Payment Section) */}
        <div className="w-full lg:w-[40%] gap-8 bg-[#1F1630] rounded-xl p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Payment Method
            </label>
            <PaymentElement
              options={{
                paymentMethodOrder: [
                  "apple_pay",
                  "google_pay",
                  "amazon_pay",
                  "card",
                ],
                wallets: {
                  applePay: "auto",
                  googlePay: "auto",
                  amazonPay: "auto",
                },
              }}
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2 text-gray-300 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10z"></path>
              </svg>
              <p>
                After submission, you will be redirected to securely complete
                next steps.
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-2 text-[#FF6B6B] text-sm text-center rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 p-3 bg-[#8A3FFC] rounded-md hover:bg-[#7834DB] disabled:opacity-50"
            disabled={!stripe || processing}
            onClick={handleSubmit}
          >
            {processing
              ? "Processing..."
              : `Pay $${selectedPlan.price || "6.99"}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckOut({ subscriptionData }) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const apiCallMade = useRef(false);
  const stripePromise = useMemo(() => {
    const publishableKey =
      process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
      "pk_test_51KQmjtSGrhNS7gNbmkFjmMwkMDwjvTvt7gn1JMruc09yI8gLwGan2Y9yWPkaKwkutb2bo1tPIeEMRfyz3iRRfEVZ00QIG2zghW";
    if (!publishableKey) {
      console.error(
        "Stripe publishable key is missing. Check your environment configuration."
      );
      return null;
    }
    return loadStripe(publishableKey);
  }, []);

  useEffect(() => {
    (async () => {
      if (apiCallMade.current) return;
      apiCallMade.current = true;
      setError("");
      try {
        const period = subscriptionData.duration === 4 ? "year" : "month";
        const response = await axiosInstance.post(
          "stripe/create-payment-intent",
          {
            amount: Math.round(subscriptionData.price * 100), // in cents
            currency: "usd",
            description: `User pay $${subscriptionData.price} for ${subscriptionData.plan_name} plan during ${period}`,
            payment_method_types: ["card", "amazon_pay"],
          }
        );
        if (response?.clientSecret) {
          setClientSecret(response?.clientSecret);
        }
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
    })();
  }, [
    subscriptionData.duration,
    subscriptionData.plan_name,
    subscriptionData.price,
  ]);

  if (!stripePromise) {
    return <p>Unable to load payment gateway. Please try again later.</p>;
  }

  return (
    <div className="container pricing_bg mx-auto p-4">
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "night",
              variables: {
                colorPrimary: "#6A11CB",
                colorBackground: "#1A1625",
                colorText: "#FFFFFF",
                colorDanger: "#FF6B6B",
                borderRadius: "8px",
              },
            },
          }}
        >
          <PaymentForm selectedPlan={subscriptionData} />
        </Elements>
      )}

      {error && <div className="text-red-500 my-2">{error}</div>}
    </div>
  );
}

const PaymentFormWithElements = () => {
  const {
    data: user,
    refreshUserData,
    isLoading: userLoading,
  } = useUserCredentials();
  const location = useLocation();
  const navigate = useNavigate();
  const subscriptionData = location.state?.subscriptionData;

  useLayoutEffect(() => {
    if (!user && !userLoading) {
      refreshUserData();
    }
    if (!subscriptionData || !Object.keys(subscriptionData)?.length) {
      navigate("/pricing");
    }
  }, [subscriptionData, navigate, user, userLoading]);

  if (userLoading) return <Loading />;

  if (!subscriptionData || !Object.keys(subscriptionData)?.length) return null;

  return (
    <>
      <Header />
      <CheckOut subscriptionData={subscriptionData} />
      <Footer />
    </>
  );
};

export default PaymentFormWithElements;
