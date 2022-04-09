const name = "Not equal";
const category = "Where clause";
const schemaSQL = `
  CREATE TABLE Item (
    id INTEGER,
    name TEXT
  );
`;
const dataSQL = `
  INSERT INTO Item VALUES (1, "vr"), (2, "ar"), (3, "ir"), (4, "xr"), (5, "mr");
`;
const solutionSQL = `
  SELECT id, name FROM Item where id != 3;
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
