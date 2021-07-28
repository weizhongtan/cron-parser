const expandExpression = (expr, minValue, maxValue, numValues) => {
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
    if (values.map((val) => parseInt(val)).some((val) => val > maxValue)) {
      return null;
    }
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

export const expandMinute = (expr) => expandExpression(expr, 0, 59, 60);

export const expandHour = (expr) => expandExpression(expr, 0, 23, 24);

export const expand = (fields) => {
  return {
    minute: expandMinute(fields.minute),
    hour: expandHour(fields.hour),
  };
};
