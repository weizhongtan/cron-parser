const { run } = require("./index");

beforeEach(() => {
  console.log = jest.fn();
});

test("prints message", () => {
  run();
  expect(console.log).toHaveBeenCalledWith("running cron-parser!");
});
