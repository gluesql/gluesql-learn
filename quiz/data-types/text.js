// TEXT QUESTION
const name = "TEXT"
const category = "Data type";
const schemaSQL = `
  CREATE TABLE Mbti (
    mbti TEXT,
    rank INTEGER,
    ratio FLOAT
  );
`;
const dataSQL = `
INSERT INTO Mbti VALUES 
  ("ISTJ", 1, 0.176), ("ISTP", 3, 0.094), ("ESTP", 10, 0.049), ("ESTJ", 4, 0.080), 
  ("ISFJ", 2, 0.106), ("ISFP", 6, 0.067), ("ESFP", 9, 0.050), ("ESFJ", 8, 0.063), 
  ("INFJ", 14, 0.029), ("INFP", 7, 0.064), ("ENFP", 5, 0.075), ("ENFJ", 15, 0.023), 
  ("INTJ", 12, 0.031), ("INTP", 11, 0.045), ("ENTP", 13, 0.030), ("ENTJ", 16, 0.020);
`;
const solutionSQL = `
  SELECT LEFT(mbti, 2) FROM Mbti ORDER BY ratio DESC;
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
