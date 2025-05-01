import React, { useCallback, useEffect, useState } from "react";
import { PlusCircle, CircleArrowLeftIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../utils/axiosHelper";

import MyStrategies from "../../components/customStrategies/MyStrategies";
import CustomTemplates from "../../components/customStrategies/CustomTemplates";
import AddEdit from "../../components/customStrategies/AddEdit";
import axios from "axios";
import { toastStyles } from "../../utils";
const CustomStrategy = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isBackVisible, setIsBackVisible] = useState(false);
  const [strategies, setStrategies] = useState(null);
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStrategy = async (signal) => {
    setLoading(true);
    try {
      const response = await axiosInstance("user/strategy?type=custom", {
        ...(signal && { signal }),
      });
      setStrategies(response.data);
      setLoading(false);
    } catch (e) {
      if (!axios.isCancel) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchStrategy(controller.signal);
    return () => controller.abort();
  }, []);

  const handleClose = useCallback(() => {
    setIsBackVisible(false);
    setValues(null);
    setActiveTab(1);
    fetchStrategy();
  }, []);

  const handleDelete = useCallback(async (id) => {
    setLoading(true);
    try {
      const { message } = await axiosInstance.delete(
        `user/strategy/custom-strategy/${id}`
      );
      if (message) {
        toast.success(message, toastStyles);
        fetchStrategy();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.message || "Failed to delete User";
      toast.error(errorMessage, toastStyles);
    }
  }, []);

  const handleEdit = useCallback((v) => {
    setValues(v);
    setIsBackVisible(true);
    setActiveTab(3);
  }, []);

  const handleUseTemplate = useCallback((v) => {
    setValues(v);
    setIsBackVisible(true);
    setActiveTab(3);
  }, []);

  return (
    <div className="container">
      <Toaster />
      <div className="flex items-center">
        {isBackVisible && (
          <button
            className="mr-2 text-white rounded-full p-1"
            onClick={() => {
              setIsBackVisible(false);
              setActiveTab(1);
            }}
          >
            <CircleArrowLeftIcon />
          </button>
        )}
        <h1 className="text-white py-4 text-3xl font-medium font-gilroy">
          Custom Strategy
        </h1>
      </div>

      <div className="bg-custom-strategy rounded-xl p-6 shadow-lg">
        {activeTab !== 3 && (
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
              <button
                className={`${
                  activeTab === 1
                    ? "bg-gradient-to-b from-[#9240E8] to-[#5F219F]"
                    : "bg-[#220C39]"
                } border border-[#B039FF] text-white px-4 py-2 rounded-full text-sm font-medium w-full md:w-auto`}
                onClick={() => setActiveTab(1)}
              >
                My Strategy
              </button>
              <button
                className={`${
                  activeTab === 2
                    ? "bg-gradient-to-b from-[#9240E8] to-[#5F219F]"
                    : "bg-[#220C39]"
                } border border-[#B039FF] text-white px-4 py-2 rounded-full text-sm font-medium w-full md:w-auto`}
                onClick={() => setActiveTab(2)}
              >
                Strategy Templates
              </button>
            </div>
            <button
              className="bg-gradient-to-b from-[#B039FF] to-[#6A11CB] border border-[#B039FF] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center w-full md:w-auto mt-4 md:mt-0"
              onClick={() => {
                setActiveTab(3);
                setValues(null);
                setIsBackVisible(true);
              }}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create New Strategy
            </button>
          </div>
        )}

        {activeTab === 1 ? (
          <MyStrategies
            loading={loading}
            strategies={strategies}
            setActiveTab={setActiveTab}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : activeTab === 2 ? (
          <CustomTemplates onUseTemplate={handleUseTemplate} />
        ) : activeTab === 3 ? (
          <AddEdit
            key={"AddEdit"}
            setValues={setValues}
            values={values}
            onClose={handleClose}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CustomStrategy;
