import { jwtDecode } from "jwt-decode";
import { getCookie } from "./cookie";

const isTokenExpired = (decoded) => {
  if (!decoded?.exp) {
    console.warn("Token does not have an expiration claim.");
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const getTokenData = () => {
  try {
    const token = getCookie("token");
    if (!token) return null;
    const decoded = jwtDecode(token);
    if (isTokenExpired(decoded)) {
      console.warn("Token is expired.");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
