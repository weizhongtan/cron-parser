const COL_BUF = 14;

export const buildTable = (fields) => {
  const specificRowMappings = {
    dayOfMonth: "day of month",
    dayOfWeek: "day of week",
  };

  return ["minute", "hour", "dayOfMonth", "month", "dayOfWeek", "command"]
    .map((rowName) => {
      return [
        (specificRowMappings[rowName] || rowName).padEnd(COL_BUF),
        fields[rowName],
      ].join("");
    })
    .join("\n");
};
