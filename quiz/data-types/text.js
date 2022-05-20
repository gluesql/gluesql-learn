const name = "TEXT"
const category = "Data type";
const schemaSQL = `
  CREATE TABLE Item (
    id INTEGER,
    name TEXT
  );
`;
const dataSQL = `
  INSERT INTO Item VALUES (1, "Foo"), (2, "Bar"), (3, "Coz");
`;
const solutionSQL = `
  SELECT id, name FROM Item;
`;

const quiz = `
  INSERT INTO Quiz VALUES (
    '${name}',
    '${category}',
    '${schemaSQL}',
    '${dataSQL}',
    '${solutionSQL}'
  );
`;

export default quiz;
