const expandExpression = (expr, minValue, maxValue, numValues) => {
  // any value
  if (expr === "*") {
    const values = [];
    for (let i = minValue; i <= maxValue; i += 1) {
      values.push(i);
    }
    return values.join(" ");
  }

  // step value
  if (expr.includes("/")) {
    const [, stepRaw] = expr.split("/");
    if (stepRaw.length === 0) {
      return null;
    }
    const step = parseInt(stepRaw);
    const values = [];
    for (let i = minValue; i <= maxValue; i += 1) {
      if (i % step === 0) {
        values.push(i);
      }
    }
    return values.join(" ");
  }

  // list value
  if (expr.includes(",")) {
    const valuesRaw = expr.split(",");
    if (valuesRaw.some((val) => val.length === 0)) {
      return null;
    }
    const values = valuesRaw.map((val) => parseInt(val));
    if (values.some((val) => val > maxValue)) {
      return null;
    }
    return values.join(" ");
  }

  // range value
  if (expr.includes("-")) {
    const [startRaw, endRaw] = expr.split("-");
    if (startRaw.length === 0 || endRaw.length === 0) {
      return null;
    }
    const start = parseInt(startRaw);
    const end = parseInt(endRaw);
    if (start > end) {
      return null;
    }
    if (end > maxValue) {
      return null;
    }
    if (start < minValue) {
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

export const expandDayOfMonth = (expr) => expandExpression(expr, 1, 31, 31);

export const expandMonth = (expr) => expandExpression(expr, 1, 12, 12);

export const expandDayOfWeek = (expr) => expandExpression(expr, 0, 6, 7);

export const expand = (fields) => {
  return {
    minute: expandMinute(fields.minute),
    hour: expandHour(fields.hour),
    dayOfMonth: expandDayOfMonth(fields.dayOfMonth),
    month: expandMonth(fields.month),
    dayOfWeek: expandDayOfWeek(fields.dayOfWeek),
    command: fields.command,
  };
};
