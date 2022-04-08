const name = 'Sample quiz 2';
const category = 'SAMPLE';
const schemaSQL = `
  CREATE TABLE Item2 (
    id INTEGER,
    name TEXT
  );
`;
const dataSQL = `
  INSERT INTO Item2 VALUES (1, "Foo"), (2, "Bar"), (3, "Coz");
`;
const solutionSQL = `
  SELECT id, name FROM Item2;
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
