import { buildTable } from "./build-table";
import { expand } from "./expand";
import { parse } from "./parse";

export const cli = () => {
  const expression = process.argv[2];
  const parsedFields = parse(expression);
  const expandedFields = expand(parsedFields);
  const output = buildTable(expandedFields);
  console.log(output);
};
