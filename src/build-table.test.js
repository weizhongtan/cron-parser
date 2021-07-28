import { buildTable } from "./build-table";

test("returns formatted table", () => {
  const result = buildTable({
    minute: "0 15 30 45",
    hour: "0",
    dayOfMonth: "1 15",
    month: "1 2 3 4 5 6 7 8 9 10 11 12",
    dayOfWeek: "1 2 3 4 5",
    command: "/usr/bin/find",
  });
  expect(result).toBe(
    `minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find`
  );
});
