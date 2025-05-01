import React, { useEffect, useState } from "react";
import { Edit, Trash, X } from "lucide-react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import CustomDropdown from "../CustomDropdown";
import {
  PRICE_ALERT_INTERVALS,
  PRICE_ALERT_OPTIONS,
} from "../../utils/constants";
import CustomInputPrice from "../CustomInputPrice";
import axiosInstance from "../../utils/axiosHelper";
import {
  formatDateTime,
  formatInputDateTimeLocal,
  toastStyles,
} from "../../utils";
import axios from "axios";

const PriceForm = ({
  priceAlertData,
  alertType,
  symbol,
  onClose,
  onChange,
  onSubmit,
  process,
}) => {
  return (
    <>
      <div className="px-8 py-3 grid grid-cols-[120px_1fr] gap-y-2 gap-x-4">
        <div className="self-center">
          <label className="text-white text-base">Alert Name</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={priceAlertData?.name || ""}
            onChange={onChange}
            className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="self-start pt-2">
          <label className="text-white text-base">Message</label>
        </div>
        <div>
          <textarea
            name="message"
            value={priceAlertData?.message || ""}
            onChange={onChange}
            className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 h-24 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
          ></textarea>
        </div>

        <div className="self-center">
          <label className="text-white text-base">Symbols</label>
        </div>
        <input
          type="text"
          value={priceAlertData?.symbol || symbol}
          readOnly
          className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 focus:outline-none"
        />

        <div className="self-center">
          <label className="text-white text-base">Condition</label>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            value={priceAlertData?.condition?.key || "price"}
            readOnly
            className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 focus:outline-none capitalize"
          />
          <CustomDropdown
            options={PRICE_ALERT_OPTIONS}
            value={
              priceAlertData?.condition?.type || PRICE_ALERT_OPTIONS[0].value
            }
            onChange={onChange}
            name="condition.type"
            showImg={true}
          />
          {["crossing", "crossing_up", "crossing_down"].includes(
            priceAlertData?.condition?.type || PRICE_ALERT_OPTIONS[0].value
          ) && (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value="Value"
                readOnly
                className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 focus:outline-none"
              />
              <CustomInputPrice
                value={
                  (priceAlertData &&
                    priceAlertData.condition &&
                    priceAlertData.condition.value) ||
                  0
                }
                name="condition.value"
                onChange={onChange}
              />
            </div>
          )}
        </div>

        {["entering_channel", "exiting_channel"].includes(
          priceAlertData?.condition?.type
        ) ? (
          <>
            <div className="self-center">
              <label className="text-white text-base">Upper Bound</label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value="Value"
                readOnly
                className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 focus:outline-none"
              />
              <CustomInputPrice
                value={priceAlertData?.condition?.upper_value || 0}
                name="condition.upper_value"
                onChange={onChange}
              />
            </div>
            <div className="self-center">
              <label className="text-white text-base">Lower Bound</label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value="Value"
                readOnly
                className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 focus:outline-none"
              />
              <CustomInputPrice
                value={priceAlertData?.condition?.lower_value || 0}
                name="condition.lower_value"
                onChange={onChange}
              />
            </div>
          </>
        ) : ["moving_up", "moving_down"].includes(
            priceAlertData?.condition?.type
          ) ? (
          <>
            <div className="self-center">
              <label className="text-white text-base"></label>
            </div>
            <div className="flex items-center justify-between pr-2">
              <CustomInputPrice
                value={priceAlertData?.condition?.diff_value || 0}
                name="condition.diff_value"
                onChange={onChange}
              />
              in
              <CustomInputPrice
                value={priceAlertData?.condition?.bar || 0}
                name="condition.bar"
                onChange={onChange}
                isInt={true}
              />
              bar
            </div>
            <div className="self-center">
              <label className="text-white text-base">Interval</label>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <CustomDropdown
                options={PRICE_ALERT_INTERVALS}
                value={
                  priceAlertData?.condition?.interval ||
                  PRICE_ALERT_INTERVALS[0].value
                }
                onChange={onChange}
                name="condition.interval"
                showImg={false}
              />
            </div>
          </>
        ) : ["moving_up_percent", "moving_down_percent"].includes(
            priceAlertData?.condition?.type
          ) ? (
          <>
            <div className="self-center">
              <label className="text-white text-base"></label>
            </div>
            <div className="flex items-center justify-between pr-2">
              <CustomInputPrice
                value={priceAlertData?.condition?.diff_percentage || 0}
                name="condition.diff_percentage"
                onChange={onChange}
              />
              in
              <CustomInputPrice
                value={priceAlertData?.condition?.bar || 0}
                name="condition.bar"
                onChange={onChange}
                isInt={true}
              />
              bar
            </div>
            <div className="self-center">
              <label className="text-white text-base">Interval</label>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <CustomDropdown
                options={PRICE_ALERT_INTERVALS}
                value={
                  priceAlertData?.condition?.interval ||
                  PRICE_ALERT_INTERVALS[0].value
                }
                onChange={onChange}
                name="condition.interval"
                showImg={false}
              />
            </div>
          </>
        ) : null}

        <div className="self-center">
          <label className="text-white text-base">Trigger</label>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-0 bg-[#1F1E20] rounded-lg border border-purple-800 p-1">
            <button
              className={`py-2 rounded-md text-center text-white ${
                !priceAlertData?.trigger
                  ? "bg-[#270D42] border border-[#333234]"
                  : ""
              }`}
              onClick={() =>
                onChange({
                  target: { name: "trigger", value: 0 },
                })
              }
            >
              Only Once
            </button>
            <button
              className={`py-2 rounded-md text-center text-white ${
                priceAlertData?.trigger
                  ? "bg-[#270D42] border border-[#333234]"
                  : ""
              }`}
              onClick={() =>
                onChange({
                  target: { name: "trigger", value: 1 },
                })
              }
            >
              Multiple Times
            </button>
          </div>
        </div>

        <div className="self-center">
          <label className="text-white text-base">Expiration</label>
        </div>
        <input
          type="datetime-local"
          name="expiration"
          value={
            priceAlertData?.expiration
              ? formatInputDateTimeLocal(new Date(priceAlertData?.expiration))
              : ""
          }
          onChange={onChange}
          className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 focus:outline-none"
        />
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-center gap-4">
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-gradient-to-r from-[#6A11CB] to-[#B039FF] text-white font-gilroy font-medium rounded-full transition hover:opacity-90"
          >
            {process ? "In Progress" : "Apply"}
          </button>
          {alertType === 2 && (
            <button
              onClick={(e) => onClose(e, true)}
              className="px-6 py-2 bg-gradient-to-r from-[#6A11CB] to-[#B039FF] text-white font-gilroy font-medium rounded-full transition hover:opacity-90"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const RenderSkeleton = () => {
  return (
    <div className="bg-purple-900 text-white rounded-lg p-4 shadow-md w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Skeleton
            width={120}
            height={24}
            baseColor="#4C0B76"
            highlightColor="#6D28D9"
          />
        </div>
        <div className="bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
          <Skeleton
            width={100}
            height={16}
            baseColor="#4C0B76"
            highlightColor="#6D28D9"
          />
        </div>
      </div>

      <div className="text-white text-sm mb-2">
        <Skeleton count={2} baseColor="#4C0B76" highlightColor="#6D28D9" />
      </div>

      <div className="flex justify-end space-x-2">
        <div className="bg-[#4C0B76] p-1 rounded-md">
          <Skeleton
            width={20}
            height={20}
            baseColor="#4C0B76"
            highlightColor="#6D28D9"
          />
        </div>
        <div className="bg-[#4C0B76] p-1 rounded-md">
          <Skeleton
            width={20}
            height={20}
            baseColor="#4C0B76"
            highlightColor="#6D28D9"
          />
        </div>
      </div>
    </div>
  );
};

const PriceAlertModal = ({ onClose, symbol, category }) => {
  const [process, setProcess] = useState(false);
  const [alertType, setAlertType] = useState(0);
  const [priceAlertData, setPriceAlertData] = useState(null);
  const [fetchedPriceAlertData, setFetchedPriceAlertData] = useState({
    loading: true,
    data: null,
    currentPage: 1,
    totalCount: 0,
    hasMore: false,
  });

  const fetchPriceAlerts = async ({ signal, page }) => {
    try {
      const { data, totalCount, hasMore } = await axiosInstance.get(
        "user/priceaction",
        {
          params: { page },
          ...(signal && { signal }),
        }
      );
      setFetchedPriceAlertData((prev) => ({
        ...prev,
        data: page > 1 ? [...prev.data, ...data] : data,
        totalCount,
        hasMore,
        loading: false,
        currentPage: page,
      }));
    } catch (error) {
      if (!axios.isCancel) {
        setFetchedPriceAlertData({
          loading: false,
          ...(page === 1 && { data: [] }),
          totalCount: 0,
          currentPage: 1,
          hasMore: false,
        });
      }
    }
  };

  useEffect(() => {
    if (alertType === 1) {
      const abortController = new AbortController();
      fetchPriceAlerts({ signal: abortController.signal, page: 1 });
      return () => abortController.abort();
    }
  }, [alertType]);

  const handlePriceAlertChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setPriceAlertData((prev) => ({
        ...(prev || {}),
        [parent]: {
          ...(prev?.[parent] || {}),
          [child]: value,
        },
      }));
    } else {
      setPriceAlertData((prev) => ({
        ...(prev || {}),
        [name]: value,
      }));
    }
  };

  const closeModal = (_, isEdit) => {
    setPriceAlertData(null);
    if (isEdit) {
      setAlertType(1);
    } else {
      onClose();
    }
  };

  const validatePriceAlert = () => {
    const errors = {};

    if (!priceAlertData?.name?.trim()) {
      errors.name = "Alert name is required";
    }

    if (
      ["entering_channel", "exiting_channel"].includes(
        priceAlertData?.condition?.type
      )
    ) {
      if (
        !priceAlertData?.condition?.upper_value ||
        priceAlertData?.condition?.upper_value <= 0
      ) {
        errors.upperValue = "Upper value must be a positive number";
      }
      if (
        !priceAlertData?.condition?.lower_value ||
        priceAlertData?.condition?.lower_value <= 0
      ) {
        errors.lowerValue = "Lower value must be a positive number";
      }
      if (
        priceAlertData?.condition?.lower_value >=
        priceAlertData?.condition?.upper_value
      ) {
        errors.valueRange = "Lower value must be less than upper value";
      }
    } else if (
      ["moving_up", "moving_down"].includes(priceAlertData?.condition?.type)
    ) {
      if (
        !priceAlertData?.condition?.diff_value ||
        priceAlertData?.condition?.diff_value <= 0
      ) {
        errors.diffValue = "Value must be a positive number";
      }
      if (
        !priceAlertData?.condition?.bar ||
        priceAlertData?.condition?.bar <= 0
      ) {
        errors.bar = "Bar value must be a positive number";
      }
      if (priceAlertData?.condition?.bar > 20) {
        errors.bar = "Bar value cannot exceed 20";
      }
      if (!priceAlertData?.condition?.interval) {
        errors.interval = "Interval must be selected";
      }
    } else if (
      ["moving_up_percent", "moving_down_percent"].includes(
        priceAlertData?.condition?.type
      )
    ) {
      if (
        !priceAlertData?.condition?.diff_percentage ||
        priceAlertData?.condition?.diff_percentage <= 0
      ) {
        errors.diffPercentage = "Percentage must be a positive number";
      }
      if (
        !priceAlertData?.condition?.bar ||
        priceAlertData?.condition?.bar <= 0
      ) {
        errors.bar = "Bar value must be a positive number";
      }
      if (priceAlertData?.condition?.bar > 20) {
        errors.bar = "Bar value cannot exceed 20";
      }
      if (!priceAlertData?.condition?.interval) {
        errors.interval = "Interval must be selected";
      }
    } else {
      if (
        !priceAlertData?.condition?.value ||
        priceAlertData?.condition?.value <= 0
      ) {
        errors.value = "Value must be a positive number";
      }
    }

    const currentDate = new Date();
    const expirationDate = new Date(priceAlertData?.expiration);

    if (!priceAlertData?.expiration) {
      errors.expiration = "Expiration date is required";
    } else if (expirationDate <= currentDate) {
      errors.expiration = "Expiration must be a future date";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmitPriceAlert = async () => {
    setProcess(true);
    const { isValid, errors } = validatePriceAlert();

    if (!isValid) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError, toastStyles);
      setProcess(false);
      return;
    }
    try {
      if (alertType === 2) {
        await axiosInstance.put(
          `user/priceaction/${priceAlertData._id}`,
          priceAlertData
        );
        toast.success("Price Alert Successfully Updated.", toastStyles);
        closeModal(1, true);
      } else {
        const baseData = {
          name: priceAlertData.name,
          message: priceAlertData.message,
          symbol: priceAlertData?.symbol || symbol,
          category: category,
          trigger: priceAlertData.trigger,
          expiration: priceAlertData.expiration,
        };

        let conditionData = {
          key: priceAlertData?.condition?.key || "price",
          type: priceAlertData?.condition?.type || PRICE_ALERT_OPTIONS[0].value,
        };

        if (
          ["entering_channel", "exiting_channel"].includes(
            priceAlertData.condition.type
          )
        ) {
          conditionData = {
            ...conditionData,
            upper_value: priceAlertData.condition.upper_value,
            lower_value: priceAlertData.condition.lower_value,
          };
        } else if (
          ["moving_up", "moving_down"].includes(priceAlertData.condition.type)
        ) {
          conditionData = {
            ...conditionData,
            diff_value: priceAlertData.condition.diff_value,
            bar: priceAlertData.condition.bar,
            interval: priceAlertData.condition.interval,
          };
        } else if (
          ["moving_up_percent", "moving_down_percent"].includes(
            priceAlertData.condition.type
          )
        ) {
          conditionData = {
            ...conditionData,
            diff_percentage: priceAlertData.condition.diff_percentage,
            bar: priceAlertData.condition.bar,
            interval: priceAlertData.condition.interval,
          };
        } else {
          conditionData = {
            ...conditionData,
            value: priceAlertData.condition.value,
          };
        }
        await axiosInstance.post("user/priceaction", {
          ...baseData,
          condition: conditionData,
        });
        toast.success("Price Alert Successfully Created.", toastStyles);
        closeModal();
      }
    } catch (error) {
      toast.error(error.message, toastStyles);
    } finally {
      setProcess(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`user/priceaction/${id}`);
      toast.success("Price Alert Successfully Deleted.", toastStyles);
      fetchPriceAlerts({ page: 1 });
    } catch (error) {
      toast.error(error.message, toastStyles);
    }
  };

  const getCardContainerStyle = () => {
    if (!fetchedPriceAlertData.data) return {};
    return {
      maxHeight: fetchedPriceAlertData.data.length > 3 ? "400px" : "none",
      overflowY: fetchedPriceAlertData.data.length > 3 ? "auto" : "visible",
      scrollbarWidth: "thin",
      scrollbarColor: "#6C4984 #220C39",
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="w-full max-w-2xl max-h-[90vh] border border-[#B039FF] bg-[linear-gradient(359.93deg,_#220C39_-10.38%,_#6C4984_99.93%)] overflow-y-auto relative z-20 rounded-3xl">
        <div className="relative flex justify-center border-b border-purple-400/20 bg-[#220C39]">
          {alertType === 2 ? null : (
            <div
              className={`w-1/2 py-4 text-center text-white${
                alertType && "/60"
              } font-medium`}
            >
              <button
                className="text-lg font-medium"
                onClick={() => setAlertType(0)}
              >
                Create Alert
                {!alertType && (
                  <div className="bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto w-3/4"></div>
                )}
              </button>
            </div>
          )}
          <div
            className={`w-1/2 py-4 text-center text-white${
              !alertType && "/60"
            } font-medium`}
          >
            <button
              className="text-lg font-medium"
              onClick={() => setAlertType(1)}
              disabled={[1, 2].includes(alertType)}
            >
              Edit Alert
              {alertType !== 0 && (
                <div className="bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto w-3/4"></div>
              )}
            </button>
          </div>
          <button
            onClick={closeModal}
            className="absolute right-3 top-3 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[linear-gradient(180deg,_rgba(255,255,255,0.68)_0%,_rgba(255,255,255,0.34)_100%)] transition"
          >
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[3px] border-[#220C39] bg-transparent">
              <X className="w-3 h-3 sm:w-4 sm:h-4 font-bold text-[#220C39]" />
            </div>
          </button>
        </div>

        {alertType === 1 ? (
          <div className="px-8 py-3 bg-purple-950">
            <p className="text-[#FFF316] font-semibold mb-4">
              {fetchedPriceAlertData.totalCount} Active alerts
            </p>

            <div
              className="flex flex-col gap-3"
              style={getCardContainerStyle()}
            >
              {fetchedPriceAlertData.loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <RenderSkeleton key={i} />)
              ) : fetchedPriceAlertData?.data?.length > 0 ? (
                fetchedPriceAlertData.data.map((item) => (
                  <div
                    className="bg-purple-900 text-white rounded-lg p-4 shadow-md w-full"
                    key={item.name}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </div>
                      <div className="bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
                        Expires: {formatDateTime(item.expiration)}
                      </div>
                    </div>

                    <p className="text-white text-sm">{item.message}</p>

                    <div className="flex justify-end space-x-2">
                      <Edit
                        className="text-white hover:text-gray-300 bg-[#4C0B76] p-1 rounded-md"
                        onClick={() => {
                          setPriceAlertData(item);
                          setAlertType(2);
                        }}
                      />
                      <Trash
                        className="text-white hover:text-gray-300 bg-[#4C0B76] p-1 rounded-md"
                        onClick={() => handleDelete(item._id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-white">
                  No data available for this category
                </p>
              )}

              {fetchedPriceAlertData?.hasMore && (
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      fetchPriceAlerts({
                        page: fetchedPriceAlertData.currentPage + 1,
                      });
                    }}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium text-base rounded-full transition"
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <PriceForm
            symbol={symbol}
            alertType={alertType}
            priceAlertData={priceAlertData}
            onChange={handlePriceAlertChange}
            onSubmit={handleSubmitPriceAlert}
            onClose={closeModal}
            process={process}
          />
        )}
      </div>
    </div>
  );
};

export default PriceAlertModal;
