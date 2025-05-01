import Cookies from "js-cookie";

export const getCookie = (key) => {
  try {
    const value = Cookies.get(key);
    if (!value) return null;

    if (key === "token") return value;

    return safeParseJSON(value);
  } catch (error) {
    console.error(`Error handling cookie for key "${key}":`, error);
    return null;
  }
};

export const safeParseJSON = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};

export const setCookie = (key, value) => {
  if (typeof value === "string") {
    Cookies.set(key, value);
  } else {
    Cookies.set(key, JSON.stringify(value));
  }
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

export const clearCookie = (arr = ["token"]) => {
  arr.forEach((key) => {
    removeCookie(key);
  });
};
