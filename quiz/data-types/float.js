const name = "FLOAT"
const category = "Data type";
const schemaSQL = `
  CREATE TABLE student (
    name TEXT,
    score FLOAT
  );
`;
const dataSQL = `
  INSERT INTO student VALUES ("seoyeon", 80.5), ("jiwon", 90.2), ("hyewon", 95.2), ("jisoo", 78.2),("jimin",89.5);
`;
const solutionSQL = `
  SELECT score, name FROM student ORDER BY score DESC LIMIT 3;
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
