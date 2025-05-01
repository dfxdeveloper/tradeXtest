import React, { useLayoutEffect } from "react";
import Badge from "../../assets/images/badge.svg";
import currentPlan from "../../assets/images/current_plan.png";
import billingDetails from "../../assets/images/billing_details.png";
import { useUserCredentials } from "../../components/context/user";
import { useConstants } from "../../components/context/constants";
import { useNavigate } from "react-router-dom";
import { formatDate, getRelativeTime } from "../../utils";

const MyPlan = () => {
  const { data: user, refreshUserData } = useUserCredentials();
  const { constants, fetchConstants } = useConstants();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!constants) {
      fetchConstants();
    }
  }, [constants, fetchConstants]);

  useLayoutEffect(() => {
    if (!user) {
      refreshUserData();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-6">
      {/* Header Card */}
      <div className="planbg rounded-2xl mb-6">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                className="h-24 w-24"
                src={Badge}
                alt="badge"
                loading="lazy"
              />
            </div>
            <div>
              {/* <div className="flex items-center gap-3 mb-1">
                <span className="bg-purple-300 bg-opacity-50 px-3 py-1 font-semibold rounded-full text-sm"></span>
                <span className="bg-green-600 px-3 py-1 rounded-full text-xs text-white capitalize ">
                  {
                    constants?.STATUS?.find(
                      (item) => item.value === user?.subscription?.status
                    )?.label
                  }
                </span>
              </div> */}
              <div className="flex items-center gap-3 mb-1">
                <div className="text-2xl font-bold text-slate-900 py-2">
                  {user?.subscription_details?.[0]?.plan_name}
                </div>
                <span
                  className={`${
                    user?.subscription?.status === 1
                      ? "bg-green-600"
                      : "bg-red-600"
                  } px-3 py-1 rounded-full text-xs text-white capitalize`}
                >
                  {
                    constants?.STATUS?.find(
                      (item) => item.value === user?.subscription?.status
                    )?.label
                  }
                </span>
              </div>
              <button
                type="button"
                className="px-6 py-2 rounded-lg text-white transition-colors text-sm bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate("/pricing")}
              >
                Change Plan
              </button>
            </div>
          </div>
          <div className="text-right text-sm text-white">
            {user?.subscription?.status === 1 && (
              <div className="flex items-center justify-end gap-2 mb-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="py-2">
                  Renews {getRelativeTime(user?.subscription?.renewal_date)}
                </span>
              </div>
            )}
            <div className="flex items-center  gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="">
                {formatDate(user?.subscription?.renewal_date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            title: "Change Plan",
            subtitle: "Explore other options",
            icon: (
              <img
                className="h-12"
                alt="changeplan"
                src={changePlan}
                loading="lazy"
              />
            ),
            onClick: () => navigate("/pricing"),
          },
          {
            title: "Billing Setting",
            subtitle: "Update Payment Method",
            icon: (
              <img
                className="h-12"
                alt="changeplan"
                src={billingSetting}
                loading="lazy"
              />
            ),
          },
          {
            title: "Billing History",
            subtitle: "View past invoices",
            icon: (
              <img
                className="h-12"
                alt="changeplan"
                src={billingHistory}
                loading="lazy"
              />
            ),
          },
        ].map((item, index) => (
          <button
            key={index}
            className="flex items-center justify-between p-4 bg-[#1A1625] hover:bg-slate-800/50 text-white rounded-xl border border-[#6A11CB]"
            onClick={item.onClick}
          >
            <div className="flex items-center gap-3">
              <div className="text-purple-500">{item.icon}</div>
              <div className="text-left">
                <div className="text-2xl pb-2">{item.title}</div>
                <div className="text-xs text-slate-400">{item.subtitle}</div>
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <img alt="arrow" src={arrow} loading="lazy" />
            </div>
          </button>
        ))}
      </div> */}

      {/* Features and Billing Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan Features */}
        <div className="bg-[#111828] rounded-xl border border-[#6A11CB] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2">
              <img
                className="h-12 w-12"
                alt="currentplan"
                src={currentPlan}
                loading="lazy"
              />
            </div>
            <span className="text-2xl font-medium text-white">
              Current Plan Features
            </span>
          </div>
          <div className="space-y-4">
            {[
              "15+ Auto recognized Chart Patterns, recognized Chart Patterns",
              "Sector Rotation & Industry Rotation",
              "Sector Rotation & Industry Rotation",
              "Sector Rotation & Industry Rotation",
              "Sector Rotation & Industry Rotation",
              "15+ Auto recognized Chart Patterns, recognized Chart Patterns",
              "Sector Rotation & Industry Rotation",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-slate-300"
              >
                <svg
                  className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Details */}
        <div className="bg-[#111828] rounded-xl border border-[#6A11CB] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2">
              <img
                className="h-12 w-12"
                alt="billingdetails"
                src={billingDetails}
                loading="lazy"
              />
            </div>
            <span className="text-2xl font-medium text-white">
              Billing Details
            </span>
          </div>
          <div className="bg-[#2C1B40] rounded-xl p-6 mb-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-slate-300">
                <span>Next Billing Date</span>
                <span>{formatDate(user?.subscription?.renewal_date)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Amount</span>
                <span className="capitalize">
                  ${user?.subscription?.price}/
                  {
                    constants?.PLANDURATIONS?.find(
                      (item) => item.value === user?.subscription?.duration
                    )?.label
                  }
                </span>
              </div>
              {/* <div className="flex justify-between items-center text-slate-300">
                <span>Payment Method</span>
                <span>****4240</span>
              </div> */}
            </div>
          </div>
          {/* <div className="flex justify-end">
            <span className="text-purple-500 text-sm cursor-pointer">
              Auto-renewal
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyPlan;
