const categories = [
  "Join",
  "SAMPLE",
  "SELECT",
  "MATH",
  "GROUP BY",
  "IS NULL",
  "String, Date",
  "Function",
];

const seed = `
  CREATE TABLE Category (
    name TEXT
  );

  CREATE TABLE Quiz (
    name TEXT,
    category TEXT,
    schema_sql TEXT,
    data_sql TEXT,
    solution_sql TEXT
  );

  INSERT INTO
    Category
  VALUES
    ${categories.map((category) => `("${category}")`).join(", ")};
`;

export default seed;
