import { expandHour, expandMinute } from "./expand";

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
