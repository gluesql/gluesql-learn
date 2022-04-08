import './components/quiz-list.js';
import './components/quiz-content.js';
import './components/code-editor.js';
import './components/table-viewer.js';
import './components/control-bar.js';

import SEED_SQL from './seed.js';
import QUIZ_SAMPLE from './quiz/sample.js';

import { gluesql } from 'https://www.gluesql.org/bin/js/gluesql.js';

const sqls = [
  SEED_SQL,
  QUIZ_SAMPLE,
];

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


function testEvents() {
  const controlBar = document.querySelector('glue-control-bar');
  controlBar.addEventListener('prev', () => console.log('prev clicked'));
  controlBar.addEventListener('next', () => console.log('next clicked'));
  controlBar.addEventListener('solution', () => console.log('solution clicked'));
  controlBar.addEventListener('run', () => console.log('run clicked'));
  controlBar.addEventListener('submit', () => console.log('submit clicked'));
}

testEvents();
