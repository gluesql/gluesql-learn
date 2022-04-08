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
  window.db = db;

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

    const result = await db.query(sql);
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
  state.quiz = firstQuiz.name
  state.category = firstQuiz.category

  const quizList = document.querySelector('glue-quiz-list');
  quizList.setAttribute('data-quiz-list', JSON.stringify(dataQuizList));
  quizList.addEventListener('select', (event) => {
    const { quiz, category } = event.detail
    state.quiz = quiz
    state.category = category
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

init();

/*
async function run() {
  const db = await gluesql();
  const result = await db.query(`
    CREATE TABLE Foo (id INTEGER, name TEXT);
    INSERT INTO Foo VALUES (1, "hello"), (2, "world");
    SELECT * FROM Foo;
  `);

  for (const item of result) {
    const node = document.createElement('code');

    node.innerHTML = `
      type: ${item.type}
      <br>
      ${item.affected ? `affected: ${item.affected}` : ''}
      ${item.rows ? `rows: ${JSON.stringify(item.rows)}` : ''}
    `;

    console.log(item);
    document.querySelector('#box').append(node);
  }

  // initialize
  await db.query(sqls.join(''));
  window.testdb = db;

}

run();
*/
