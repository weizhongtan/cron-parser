import { buildTable } from "./build-table";
import { cli } from "./cli";
import { expand } from "./expand";
import { parse } from "./parse";

jest.mock("./parse");
jest.mock("./expand");
jest.mock("./build-table");

beforeEach(() => {
  console.log = jest.fn();
  parse.mockReturnValue({
    minute: "*/15",
    hour: "0",
    dayOfMonth: "1,15",
    month: "*",
    dayOfWeek: "1-5",
    command: "mock-command-expr",
  });
  expand.mockReturnValue({
    minute: "0 15 30 45",
    hour: "0",
    dayOfMonth: "1 15",
    month: "1 2 3 4 5 6 7 8 9 10 11 12",
    dayOfWeek: "1 2 3 4 5",
    command: "/usr/bin/find",
  });
  buildTable.mockReturnValue(`
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find`);
});

test("return parsed expression", () => {
  process.argv = ["node", "cron-parser", "1 2 3 4 5"];
  cli();
  expect(console.log).toHaveBeenCalledWith(`
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find`);
});
