const { parse } = require("./parse");

test("parses `*/15 0 1,15 * 1-5 /usr/bin/find`", () => {
  expect(parse("*/15 0 1,15 * 1-5 /usr/bin/find")).toEqual({
    minute: "*/15",
    hour: "0",
    dayOfMonth: "1,15",
    month: "*",
    dayOfWeek: "1-5",
    command: "/usr/bin/find",
  });
});

test("parses multiple command arguments", () => {
  expect(parse("*/15 0 1,15 * 1-5 one two three")).toEqual({
    minute: "*/15",
    hour: "0",
    dayOfMonth: "1,15",
    month: "*",
    dayOfWeek: "1-5",
    command: "one two three",
  });
});
