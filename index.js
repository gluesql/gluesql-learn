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

let db;

async function init() {
  db = await gluesql();
  await db.query(sqls.join(''));
  window.db = db;

  initControlBar();
  initQuizList();
  initCodeEditor();
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
  controlBar.addEventListener('run', () => console.log('run clicked'));
  controlBar.addEventListener('submit', () => console.log('submit clicked'));
}

async function initQuizList() {
  const dataQuizList = await db.query('SELECT q.name, q.category FROM Quiz AS q INNER JOIN Category AS c ON q.category = c.name')
    .then(res => res[0].rows)
    .then(JSON.stringify)

  const quizList = document.querySelector('glue-quiz-list');
  quizList.setAttribute('data-quiz-list', dataQuizList);
  quizList.addEventListener('select', (event) => console.log(event));
}

function initCodeEditor() {
  const codeEditor = document.querySelector('glue-code-editor.main');
  codeEditor.addEventListener('change', (event) => console.log(event));
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
