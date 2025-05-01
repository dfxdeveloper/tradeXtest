import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../../utils/axiosHelper";

const SignalsContext = createContext();

export const SignalsProvider = ({ children }) => {
  const [signals, setSignals] = useState({
    signals: [],
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSignals = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      // Get token from localStorage
      const data = JSON.parse(localStorage.getItem("authData"));
      const token = data?.token;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axiosInstance.get(
        `user/pattern-signal?page=${page}`
      );

      if (response.data) {
        setSignals({
          signals: response.signals || [],
          currentPage: page,
          totalPages: Math.ceil(response.totalCount / 10), // Assuming 10 items per page
          totalCount: response.totalCount || 0,
        });
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch signals");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    signals,
    loading,
    error,
    fetchSignals,
  };

  return (
    <SignalsContext.Provider value={value}>{children}</SignalsContext.Provider>
  );
};

export const useSignals = () => {
  const context = useContext(SignalsContext);
  if (!context) {
    throw new Error("useSignals must be used within a SignalsProvider");
  }
  return context;
};
