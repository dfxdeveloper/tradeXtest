export const filterCompnayToken = (COMPANY_TOKENS = [], identifiers = []) => {
  try {
    if (!Array.isArray(COMPANY_TOKENS) || !Array.isArray(identifiers)) {
      throw new Error("COMPANY_TOKENS or identifiers must be an array!");
    }
    return COMPANY_TOKENS.filter((val) =>
      identifiers.includes(val.identifier)
    )?.map(({ instrument_token }) => +instrument_token);
  } catch (e) {
    console.error("Error filtering company tokens:", e);
    return [];
  }
};

export const changeFormat = {
  indian: (values) => values,
  us: (values) => values,
  forex: (values) => values.map((v) => v.replace("C:", "")),
  crypto: (values) =>
    values.map((v) =>
      v.replace(/^X:/, "").replace(/USDT$/, "-USD").replace(/USD$/, "-USD")
    ),
};

export const generateRandomPrice = () => {
  return (Math.random() * 4).toFixed(3);
};
