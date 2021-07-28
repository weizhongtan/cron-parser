const expandMinute = (expr) => {
  const minValue = 0;
  const maxValue = 59;
  const numValues = 60;

  if (expr === "*") {
    const values = [];
    for (let i = minValue; i <= maxValue; i += 1) {
      values.push(i);
    }
    return values.join(" ");
  }

  if (expr.includes("/")) {
    const [, stepStr] = expr.split("/");
    const step = parseInt(stepStr);
    const values = [];
    for (let i = minValue; i <= maxValue; i += step) {
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
    if (start > end) {
      return null;
    }
    if (end > maxValue) {
      return null;
    }
    const values = [];
    for (let i = start; i <= end; i += 1) {
      values.push(i);
    }
    return values.join(" ");
  }

  const literal = parseInt(expr);
  if (literal > maxValue) {
    return null;
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
