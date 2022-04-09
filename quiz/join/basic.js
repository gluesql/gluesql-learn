const name = "Basic";
const category = "Join";
const schemaSQL = `
  CREATE TABLE employee (
    id INTEGER,
    name TEXT,
    deptn INTEGER
  );

  CREATE TABLE department (
    deptn INTEGER,
    dname TEXT
  );
`;

const dataSQL = `
  INSERT INTO employee VALUES (123, "A", 2), (20, "B", 3), (313, "C", 3), (234, "D", 1), (56, "E", 1);
  INSERT INTO department VALUES (1, "IT"), (2, "MARKETING"), (3, "SALSE");
`;

const solutionSQL = `
  SELECT e.id, e.name, d.dname
  from employee e inner join department d
  where e.deptn = d.deptn;
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
