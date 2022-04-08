import './components/quiz-list.js';
import './components/quiz-content.js';
import './components/code-editor.js';
import './components/table-viewer.js';
import './components/query-result.js';
import './components/control-bar.js';
import './components/solution-modal.js';

import SEED_SQL from './seed.js';
import QUIZ_SAMPLE from './quiz/sample.js';
import QUIZ_SAMPLE2 from './quiz/sample2.js'

import { gluesql } from 'https://www.gluesql.org/bin/js/gluesql.js';

const sqls = [
  SEED_SQL,
  QUIZ_SAMPLE,
  QUIZ_SAMPLE2,
];

const state = {
  category: '',
  quiz: ''
}

let db;
let sql;

async function init() {
  db = await gluesql();
  await db.query(sqls.join(''));
  window.globaldb = db;

  initControlBar();
  initQuizList();
  initCodeEditor();
  queryResult()
}

function initControlBar() {
  const controlBar = document.querySelector('glue-control-bar');
  controlBar.addEventListener('prev', () => console.log('prev clicked'));
  controlBar.addEventListener('next', () => console.log('next clicked'));
  controlBar.addEventListener('solution', () => {
    document
      .querySelector('glue-solution-modal')
      .setAttribute('data-sql', 'SELECT 1;');
  });

  controlBar.addEventListener('run', async () => {
    if (!sql) return;

    const result = await state.db.query(sql);
    console.log('[run]', sql);

    document
      .querySelector('glue-query-result')
      .setAttribute('data-query-result', JSON.stringify(result));
  });

  controlBar.addEventListener('submit', () => console.log('submit clicked'));
}

async function initQuizList() {
  const dataQuizList = await db.query('SELECT q.name, q.category FROM Quiz AS q INNER JOIN Category AS c ON q.category = c.name')
    .then(res => res[0].rows)

  const firstQuiz = dataQuizList[0]
  selectQuiz({
    quiz: firstQuiz.name,
    category: firstQuiz.category
  });

  const quizList = document.querySelector('glue-quiz-list');
  quizList.setAttribute('data-quiz-list', JSON.stringify(dataQuizList));
  quizList.setAttribute('selected-quiz', JSON.stringify(state));

  quizList.addEventListener('select', (event) => {
    selectQuiz(event.detail);
  });
}

function initCodeEditor() {
  document
    .querySelector('glue-code-editor.main')
    .addEventListener('change', (event) => {
      sql = event.detail;
    });
}

async function queryResult() {
  const dataRows = await db.query('SELECT * FROM Quiz')
  .then(JSON.stringify)

  const tableViewer = document.querySelector('glue-query-result');
  tableViewer.setAttribute('data-query-result', dataRows)
}

async function selectQuiz(arg) {
  state.quiz = arg.quiz;
  state.category = arg.category;

  document
    .querySelector('glue-quiz-list')
    .setAttribute('selected-quiz', JSON.stringify(arg));

  state.db = await gluesql();

  let quiz = await db.query(`
    SELECT
      category,
      name,
      schema_sql as schemaSQL,
      data_sql as dataSQL
    FROM
      Quiz
    WHERE
      category = "${state.category}" AND
      name = "${state.quiz}";
  `);
  quiz = quiz[0].rows[0];

  await state.db.query(quiz.schemaSQL);
  await state.db.query(quiz.dataSQL);

  const { tables } = (await state.db.query('SHOW TABLES'))[0];
  const dataList = await Promise.all(tables.map(async (tableName) => {
    const { rows } = (await state.db.query(`SELECT * FROM ${tableName}`))[0];

    return {
      name: tableName,
      rows,
    };
  }));

  const content = {
    category: quiz.category,
    name: quiz.name,
    schemaSQL: quiz.schemaSQL,
    dataList,
  };

  document
    .querySelector('glue-quiz-content')
    .setAttribute('data-content', JSON.stringify(content));
}

init();
