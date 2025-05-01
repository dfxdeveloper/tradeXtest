// UserCredentialsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getTokenData } from "../../services/auth";
import axiosInstance from "../../utils/axiosHelper";

export const UserCredentialsContext = createContext(undefined);

export const UserCredentialsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const decoded = getTokenData();
      if (!decoded?._id) throw new Error("Authentication error");
      const response = await axiosInstance.get(`user/${decoded._id}`);
      setData(response.user);
      return response;
    } catch (err) {
      setError(err.message || "An error occurred");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const refreshUserData = async () => await fetchUserData();

  return (
    <UserCredentialsContext.Provider
      value={{ data, isLoading, error, refreshUserData }}
    >
      {children}
    </UserCredentialsContext.Provider>
  );
};

export const useUserCredentials = () => {
  const context = useContext(UserCredentialsContext);
  if (context === undefined) {
    throw new Error(
      "useUserCredentials must be used within a UserCredentialsProvider"
    );
  }
  return context;
};
