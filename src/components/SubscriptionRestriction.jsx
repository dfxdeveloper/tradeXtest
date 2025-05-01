import React from "react";
import { Link } from "react-router-dom";

function SubscriptionRestriction({ userData }) {
  const isPlanExpired =
    userData?.subscription?.status === 2 ||
    userData?.subscription?.status === 3;
  const needsUpgrade = userData?.subscription?.plan === 1;

  if (!isPlanExpired && !needsUpgrade) return null;

  return (
    <div className="flex min-h-full items-center justify-center p-4 bg-opacity-50 transition-opacity">
      <div className="w-full max-w-lg rounded-lg bg-gray-900 shadow-xl">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-center text-2xl font-semibold text-white">
              {isPlanExpired ? "Plan Expired!" : "Access Restricted"}
            </h2>
          </div>
          <div className="my-6">
            <p className="text-center text-gray-300">
              {isPlanExpired
                ? "Please renew your subscription plan to access webservices."
                : "Upgrade your plan to unlock premium features and access more."}
            </p>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/pricing"
              className="inline-block rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-500"
            >
              {isPlanExpired ? "Renew Now" : "Upgrade Now"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionRestriction;
