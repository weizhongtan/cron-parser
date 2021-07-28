const { parse } = require("./parse");
const { expand } = require("./expand");
const { buildTable } = require("./build-table");

const cli = () => {
  const expression = process.argv[2];
  const parsedFields = parse(expression);
  const expandedFields = expand(parsedFields);
  const output = buildTable(expandedFields);
  console.log(output);
};

exports.cli = cli;
