const parse = (expression) => {
  const [minute, hour, dayOfMonth, month, dayOfWeek, ...commandList] =
    expression.split(" ");
  return {
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
    command: commandList.join(" "),
  };
};

exports.parse = parse;
