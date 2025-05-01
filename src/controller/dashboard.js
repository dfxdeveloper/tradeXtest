export const transformData = (data) => {
  return data.flatMap((item) => {
    const baseInfo = {
      timestamp: item.timestamp,
      companyIdentifier: item.companyIdentifier,
      time_interval: item.time_interval,
      contract_type: item.contract_type,
      close: item.close,
      high: item.high,
      low: item.low,
      open: item.open,
    };

    const patternEntries = item?.patternKeys?.length
      ? item?.patternKeys.map((key) => ({
          type: "pattern",
          name: key,
          movement: item.patterns[key].movement,
          suggested_action: item.patterns[key].suggested_action.text,
          ...baseInfo,
        }))
      : [];

    const strategyEntries = item?.strategyKeys?.length
      ? item?.strategyKeys.map((key) => ({
          type: "strategy",
          name: key,
          movement: item.strategies[key].movement,
          suggested_action: item.strategies[key].suggested_action.text,
          ...baseInfo,
        }))
      : [];

    return [...patternEntries, ...strategyEntries];
  });
};
