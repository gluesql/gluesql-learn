class GlueQuizList extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();

    const aside = document.createElement('aside');
    aside.innerHTML = this.update();
    this.shadowRoot.append(style, aside);
  }

  connectedCallback() {
  }

  attributeChangedCallback() {
  }

  update() {
    const basics = [
      'Hello world',
      'Data types',
      'SELECT 1',
      'SELECT 2',
    ];

    const advanced = [
      'More stuffs',
      'Something more',
      'Harder',
      'Quite Harder',
    ];

    return `
      ${this.renderSection('Basics', basics)}
      ${this.renderSection('Advanced', advanced)}
    `;
  }

  renderSection(category, quizList) {
    return `
      <section>
        <h3>${category}</h3>
        <ul>
          ${quizList.map(name => (
            `<li><button>${name}</button></li>`
          )).join('')}
        </ul>
      </section>
    `;
  }

  getStyle() {
    return `
      :host {
        display: inline-block;

        background-color: white;

        --border-color: #ddd;

        overflow-x: hidden;
        overflow-y: auto;
      }

      aside {
        width: 100%;
        padding: 10px;
        border-right: 1px solid var(--border-color);
      }

      h3 {
        margin-top: 20px;
        margin-bottom: 10px;
      }

      ul {
        margin-top: 10px;
        padding-inline-start: 30px;
      }

      button {
        background-color: transparent;
        border: none;
        box-shadow: none;

        font-family: inherit;
        font-size: 16px;
        border-radius: 4px;

        cursor: pointer;
      }

      button:hover {
        background-color: rgba(100, 100, 100, 0.2);
      }

      button:active {
        background-color: rgba(100, 100, 100, 0.3);
      }
    `;
  }
}

customElements.define('glue-quiz-list', GlueQuizList);
