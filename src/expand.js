const expandMinute = (expr) => {
  const min = 0;
  const max = 59;
  const numValues = 60;

  if (expr === "*") {
    const values = [];
    for (let i = min; i <= max; i += 1) {
      values.push(i);
    }
    return values.join(" ");
  }

  if (expr.includes("/")) {
    const [, stepStr] = expr.split("/");
    const step = parseInt(stepStr);
    const values = [];
    for (let i = min; i <= max; i += step) {
      values.push(i);
    }
    return values.join(" ");
  }

  if (expr.includes(",")) {
    const values = expr.split(",");
    return values.join(" ");
  }

  if (expr.includes("-")) {
    const [startStr, endStr] = expr.split("-");
    const start = parseInt(startStr);
    const end = parseInt(endStr);
    const values = [];
    for (let i = start; i <= end; i += 1) {
      values.push(i);
    }
    return values.join(" ");
  }

  return expr;
};

const expand = (fields) => {
  const minuteExpansion = expandMinute(fields.minute);
  return {
    minute: minuteExpansion,
  };
};

exports.expandMinute = expandMinute;
exports.expand = expand;
