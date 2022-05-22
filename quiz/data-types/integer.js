const name = "INTEGER"
const category = "Data type";
const schemaSQL = `
  CREATE TABLE User (
    id INTEGER,
    name TEXT,
  );
  CREATE TABLE BankBook (
    user_id INTEGER,
    price INTEGER,
    type TEXT,
    checked INTEGER,
  );
`;

const dataSQL = `
  INSERT INTO User VALUES (1, "Foo"), (2, "Bar"), (3, "Coz");
  INSERT INTO BankBook VALUES (1, 100000, "deposit", 1), (1, -10000, "withdraw", 1), (1, -50000, "withdraw", 1), (1, -990000, "payAfter", 1), (1, 500000, "deposit", 1),
  (2, -490000, "payAfter", 1), (2, 100000, "deposit", 0), (2, 200000, "deposit", 1),
  (3, 500000, "deposit", 1), (3, -200000, "withdraw", 0), (3, -100000, "payAfter", 1);
`;
const solutionSQL = `
  SELECT User.name, SUM(price) FROM BankBook JOIN User ON User.id = BankBook.user_id GROUP BY user_id;
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
