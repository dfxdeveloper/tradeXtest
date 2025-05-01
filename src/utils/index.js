import { TAGS } from "./constants";

export const deepFindKey = (obj, targetKey) => {
  if (typeof obj !== "object" || obj === null) {
    return undefined;
  }

  for (const key in obj) {
    if (key === targetKey) {
      return obj[key];
    }

    if (typeof obj[key] === "object") {
      const result = deepFindKey(obj[key], targetKey);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return undefined;
};

export const toastStyles = {
  style: {
    background: "linear-gradient(180deg, #B039FF 0%, #A871FF 100%)",
    color: "white",
    padding: "16px",
    borderRadius: "8px",
    fontWeight: "500",
  },
  duration: 2000,
};

export const convertConstantsToCamelCase = (str) => {
  if (typeof str !== "string" && !str.length) return null;
  return str
    .toLowerCase()
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const debounce = (func, delay = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const formatDate = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getRelativeTime = (dateString) => {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  const timeDifferenceInMilliseconds = targetDate - currentDate;

  const daysInCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const secondsInDay = 86400 * 1000;
  const secondsInMonth = 2592000 * 1000;

  const daysDifference = Math.floor(
    timeDifferenceInMilliseconds / secondsInDay
  );
  const monthsDifference = Math.floor(
    timeDifferenceInMilliseconds / secondsInMonth
  );

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(daysDifference) < daysInCurrentMonth) {
    return rtf.format(daysDifference, "day");
  } else {
    return rtf.format(monthsDifference, "month");
  }
};

export const formatRelativeTime = (timestamp) => {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
    style: "long",
  });

  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;

  // Convert to seconds, minutes, hours, days, etc.
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths =
    now.getMonth() -
    past.getMonth() +
    12 * (now.getFullYear() - past.getFullYear());
  const diffYears = now.getFullYear() - past.getFullYear();

  // Return the most appropriate time unit
  if (Math.abs(diffSeconds) < 60) {
    return rtf.format(-diffSeconds, "second");
  } else if (Math.abs(diffMinutes) < 60) {
    return rtf.format(-diffMinutes, "minute");
  } else if (Math.abs(diffHours) < 24) {
    return rtf.format(-diffHours, "hour");
  } else if (Math.abs(diffDays) < 30) {
    return rtf.format(-diffDays, "day");
  } else if (Math.abs(diffWeeks) < 5) {
    // Approx. 4 weeks in a month
    return rtf.format(-diffWeeks, "week");
  } else if (Math.abs(diffMonths) < 12) {
    return rtf.format(-diffMonths, "month");
  } else {
    return rtf.format(-diffYears, "year");
  }
};

export const filterTags = (userPreferTags, tags = TAGS) => {
  if (!userPreferTags?.length) return [];
  const normalizeTag = (tag) => tag.toLowerCase().replace(/\s+/g, "");
  const normalizedUserTags = userPreferTags.map(normalizeTag);
  return tags.filter((tag) => {
    const normalizedTag = normalizeTag(tag.replace("#", ""));
    return normalizedUserTags.includes(normalizedTag);
  });
};

export const hasEmptyArray = (obj = {}) => {
  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key].length === 0) {
      return true;
    }
  }
  return false;
};

export const round = (num, decimals) => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

export const patternTypeImage = (s) => {
  if (!s) return "";
  return `https://pattern-types.s3.amazonaws.com/${s}.png`;
};

export const strategyLabel = (s, trend) => {
  if (!s) return "";
  if (s === "golden_cross_over_strategy" && trend === "bearish") {
    return "Death Cross Over Strategy";
  }
  return s.replace(/_/g, " ");
};
