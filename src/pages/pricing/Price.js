import React, { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";

import PricePlan from "./PricePlan";
import ChoosePlan from "./ChoosePlan";
import WhyTradeXpert from "./WhyTradeXpert";
import Footer from "../../components/Footer";
import JoinNowLink from "./JoinNowLink";
import Header from "../../components/Header";
import axiosInstance from "../../utils/axiosHelper";

function Price() {
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await axiosInstance.get("user/subscription");
      if (response?.data?.length) {
        setSubscriptions(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      <Header />
      <PricePlan subscriptions={subscriptions} />
      <ChoosePlan subscriptions={subscriptions} />
      <WhyTradeXpert />
      {/* <FAQSection /> */}
      <JoinNowLink />
      <Footer />
    </>
  );
}

export default Price;
