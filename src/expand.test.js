import {
  expand,
  expandDayOfMonth,
  expandDayOfWeek,
  expandHour,
  expandMinute,
  expandMonth,
} from "./expand";

const scenarios = [
  [
    "expandMinute",
    expandMinute,
    [
      [
        "*",
        "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59",
      ],
      ["*/15", "0 15 30 45"],
      ["0", "0"],
      ["1,15,24,32,59", "1 15 24 32 59"],
      ["1-5", "1 2 3 4 5"],
    ],
    [
      ["60-59", null], // start value outside range
      ["1-60", null], // end value outside range
      ["60", null], // literal value outside range
      ["2-1", null], // start value greater than end value
      ["1,60", null], // value in list outside range
    ],
  ],
  [
    "expandHour",
    expandHour,
    [
      ["*", "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23"],
      ["*/15", "0 15"],
      ["0", "0"],
      ["1,15", "1 15"],
      ["1-5", "1 2 3 4 5"],
    ],
    [
      ["24-1", null], // start value outside range
      ["1-24", null], // end value outside range
      ["24", null], // literal value outside range
      ["2-1", null], // start value greater than end value
      ["1,24", null], // value in list outside range
    ],
  ],
  [
    "expandDayOfMonth",
    expandDayOfMonth,
    [
      [
        "*",
        "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31",
      ],
      ["*/15", "15 30"],
      ["0", "0"],
      ["1,15", "1 15"],
      ["1-5", "1 2 3 4 5"],
    ],
    [
      ["32-1", null], // start value outside range
      ["1-32", null], // end value outside range
      ["32", null], // literal value outside range
      ["2-1", null], // start value greater than end value
      ["1,32", null], // value in list outside range
    ],
  ],
  [
    "expandMonth",
    expandMonth,
    [
      ["*", "1 2 3 4 5 6 7 8 9 10 11 12"],
      ["*/2", "2 4 6 8 10 12"],
      ["0", "0"],
      ["1,12", "1 12"],
      ["1-5", "1 2 3 4 5"],
    ],
    [
      ["0-1", null], // start value outside range
      ["1-13", null], // end value outside range
      ["13", null], // literal value outside range
      ["2-1", null], // start value greater than end value
      ["1,13", null], // value in list outside range
    ],
  ],
  [
    "expandDayOfWeek",
    expandDayOfWeek,
    [
      ["*", "0 1 2 3 4 5 6"],
      ["*/2", "0 2 4 6"],
      ["0", "0"],
      ["0,6", "0 6"],
      ["1-5", "1 2 3 4 5"],
    ],
    [
      ["7-1", null], // start value outside range
      ["1-7", null], // end value outside range
      ["7", null], // literal value outside range
      ["2-1", null], // start value greater than end value
      ["0,7", null], // value in list outside range
    ],
  ],
];

scenarios.forEach(([fnName, fn, validCases, invalidCases]) => {
  describe(fnName, () => {
    test.each(validCases)("expands valid case: %p", (expression, expected) => {
      const result = fn(expression);
      expect(result).toEqual(expected);
    });

    test.each(invalidCases)("returns null for: %p", (expression, expected) => {
      const result = fn(expression);
      expect(result).toEqual(expected);
    });
  });
});

describe("expand", () => {
  test("expands all fields", () => {
    const result = expand({
      minute: "*/15",
      hour: "0",
      dayOfMonth: "1,15",
      month: "*",
      dayOfWeek: "1-5",
      command: "/usr/bin/find",
    });
    expect(result).toEqual({
      minute: "0 15 30 45",
      hour: "0",
      dayOfMonth: "1 15",
      month: "1 2 3 4 5 6 7 8 9 10 11 12",
      dayOfWeek: "1 2 3 4 5",
    });
  });
});
