const localStorageWithExpiry = {
  setItem: (key, value, ttlMilliseconds) => {
    const item = {
      value,
      expiry: Date.now() + ttlMilliseconds,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  getItem: (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error("Error parsing cached data:", error);
      localStorage.removeItem(key);
      return null;
    }
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  clearItems: (keys) => {
    if (!Array.isArray(keys) || !keys.length) return false;
    keys.forEach((key) => localStorage.removeItem(key));
    return true;
  },
};

export default localStorageWithExpiry;
