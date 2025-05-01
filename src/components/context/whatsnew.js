// WhatsNewContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosHelper";

const WhatsNewContext = createContext(undefined);

export const WhatsNewProvider = ({ children }) => {
  const [whatsNewData, setWhatsNewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWhatsNewData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`user/whatsnew`);
      setWhatsNewData(response?.whatsnew);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWhatsNewData();
  }, []);

  const refetch = () => fetchWhatsNewData();

  return (
    <WhatsNewContext.Provider
      value={{
        whatsNewData,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </WhatsNewContext.Provider>
  );
};

export const useWhatsNew = () => {
  const context = useContext(WhatsNewContext);
  if (context === undefined) {
    throw new Error("useWhatsNew must be used within a WhatsNewProvider");
  }
  return context;
};
