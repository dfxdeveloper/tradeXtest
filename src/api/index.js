import axios from "axios";

// Get token from localStorage
const data = JSON.parse(localStorage.getItem("authData"));
const token = data?.token;

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api/v1"
      : "https://stage.api.tradexpert.ai/api/v1",
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export const authGoogleCallback = async (authCode) => {
  try {
    const response = await api.get(
      `/user/auth/google/callback?code=${authCode}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
