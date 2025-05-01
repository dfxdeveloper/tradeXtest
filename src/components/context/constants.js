import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../../utils/axiosHelper";

export const ConstantsContext = createContext(undefined);

export const ConstantsProvider = ({ children }) => {
  const [constants, setConstants] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConstants = async () => {
    setLoading(false);
    try {
      const response = await axiosInstance.get("constants");
      setConstants(response);
      return response;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConstants();
  }, []);

  return (
    <ConstantsContext.Provider
      value={{ constants, loading, error, fetchConstants }}
    >
      {children}
    </ConstantsContext.Provider>
  );
};

export const useConstants = () => {
  const context = useContext(ConstantsContext);
  if (context === undefined) {
    throw new Error("useConstants must be used within a ConstantsContext");
  }
  return context;
};
