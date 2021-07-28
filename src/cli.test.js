import { cli } from "./cli";

beforeEach(() => {
  console.log = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  process.argv = [];
});

test("prints parsed expression", () => {
  process.argv = ["node", "cron-parser", "*/15 0 1,15 * 1-5 /usr/bin/find"];
  cli();
  expect(console.log).toHaveBeenCalledWith(
    `minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find`
  );
});

test("prints error if step expression is invalid", () => {
  process.argv = ["node", "cron-parser", "*/ 0 1,15 * 1-5 /usr/bin/find"];
  cli();
  expect(console.error).toHaveBeenCalledWith("invalid expression");
});

test("prints error if literal expression cannot be expanded", () => {
  process.argv = ["node", "cron-parser", "*/15 99 1,15 * 1-5 /usr/bin/find"];
  cli();
  expect(console.error).toHaveBeenCalledWith("invalid expression");
});

test("prints error if list expression cannot be expanded", () => {
  process.argv = ["node", "cron-parser", "*/15 0 1, * 1-5 /usr/bin/find"];
  cli();
  expect(console.error).toHaveBeenCalledWith("invalid expression");
});

test("prints error if range expression cannot be expanded", () => {
  process.argv = ["node", "cron-parser", "*/15 0 1,15 * 1- /usr/bin/find"];
  cli();
  expect(console.error).toHaveBeenCalledWith("invalid expression");
});
