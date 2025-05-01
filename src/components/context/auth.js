import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  authData: null,
  setAuthData: () => {}, // Provide a default no-op function
});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    // Get auth data from session storage on initial load
    const storedAuthData = localStorage.getItem("authData");
    if (storedAuthData) {
      setAuthData(JSON.parse(storedAuthData));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("authData", JSON.stringify(data));
    setAuthData(data);
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setAuthData(null);
  };

  const updateAuthData = (newAuthData) => {
    localStorage.setItem("authData", JSON.stringify(newAuthData)); // Sync to localStorage
    setAuthData(newAuthData); // Update state
  };

  return (
    <AuthContext.Provider
      value={{ authData, login, logout, setAuthData: updateAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
