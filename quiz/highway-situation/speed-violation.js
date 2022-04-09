const name = "Speed violation";
const category = "Highway situation";
const schemaSQL = `
  CREATE TABLE speeding (
    time_stamp TIMESTAMP,
    num INTEGER,
    color TEXT,
    speed FLOAT,
    credit INTEGER
  );
`;
const dataSQL = `
  INSERT INTO speeding VALUES (now(), 20-1992, "red", 68.4, 400), (now(), 20-8503, "blue", 88.4, 800),
                                (now(), 20-8534, "black", 71.4, 642), (now(), 20-5943, "yellow", 64.1, 352),
                                   (now(), 20-1223, "green", 75.9, 583), (now(), 20-1464, "pink", 66.0, 389);
`;
const solutionSQL = `
  SELECT time_stamp, num, color,speed, credit FROM speeding;
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
