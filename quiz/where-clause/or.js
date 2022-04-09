const name = "Or";
const category = "Where clause";
const schemaSQL = `
  CREATE TABLE Item (
    number INTEGER,
    name TEXT
  );
`;
const dataSQL = `
  INSERT INTO Item VALUES
    (1, "foo"), (2, "Bar"), (3, "Coz"),(4, "qwe"),(5, "asd");
`;
const solutionSQL = `
  SELECT number,name FROM Item where number = 1 or name="qwe";
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
