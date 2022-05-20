// Data types
import INTEGER from "./data-types/integer.js";
import FLOAT from "./data-types/float.js";
import TEXT from "./data-types/text.js";
import DATE from "./data-types/date.js";
import TIME from "./data-types/time.js";
import TIMESTAMP from "./data-types/timestamp.js";
import MAP from "./data-types/map.js";
import LIST from "./data-types/list.js";

// Other
import QUIZ_SAMPLE from "./sample.js";
import QUIZ_SAMPLE2 from "./sample2.js";
import JOIN_BASIC from "./join/basic.js";
import WHERE_CLAUSE_OR from "./where-clause/or.js";
import WHERE_CLAUSE_NOT_EQUAL from "./where-clause/not-equal.js";
import SPEED_VIOLATION from "./highway-situation/speed-violation.js";

const quizList = [
  INTEGER,
  FLOAT,
  TEXT,
  DATE,
  TIME,
  TIMESTAMP,
  MAP,
  LIST,
  QUIZ_SAMPLE,
  QUIZ_SAMPLE2,
  SPEED_VIOLATION,
  WHERE_CLAUSE_NOT_EQUAL,
  WHERE_CLAUSE_OR,
  JOIN_BASIC
];

export default quizList;
