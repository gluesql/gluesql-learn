class GlueQuizList extends HTMLElement {
  static get observedAttributes() { return ['data-quiz-list', 'selected-quiz'] }

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
    this.updateAside()
  }

  attributeChangedCallback() {
    this.updateAside()
  }

  updateAside() {
    const aside = this.shadowRoot.querySelector('aside')
    aside.innerHTML = this.update()

    aside
      .querySelectorAll('button')
      .forEach(button => button.addEventListener('click', this.dispatch.bind(this)));
  }

  dispatch(event) {
    const selectedCategory = event.target.getAttribute('data-category') ?? ''
    const selectedQuiz = event.target.textContent

    this.dispatchEvent(new CustomEvent('select', {
      bubbles: true,
      composed: true,
      detail: {
        category: selectedCategory,
        quiz: selectedQuiz
      } 
    }));
  }

  update() {
    const quizList = this.hasAttribute('data-quiz-list')
      ? JSON.parse(this.getAttribute('data-quiz-list'))
      : [];

    const quizGroupByCategory = {}
    quizList
      .forEach(({name, category}) => {
        quizGroupByCategory[category] ?
          quizGroupByCategory[category].push(name) : quizGroupByCategory[category] = [name]
      })

    return Object.entries(quizGroupByCategory)
      .map(([category, quizList]) => this.renderSection(category, quizList))
      .join('');
  }

  renderSection(category, quizList) {
    const {
      quiz: selectedQuiz,
      category: selectedCategory,
    } = JSON.parse(this.getAttribute('selected-quiz'));

    return `
      <section>
        <h3>${category}</h3>
        <ul>
          ${quizList.map(name => {
            const selected = name === selectedQuiz && category === selectedCategory

            return `<li><button ${selected && `class = "selected"`} data-category="${category}">${name}</button></li>`
          }).join('')}
        </ul>
      </section>
    `;
  }

  getStyle() {
    return `
      :host {
        display: inline-block;

        background-color: white;

        overflow-x: hidden;
        overflow-y: auto;
        border-right: 1px solid #ddd;
      }

      aside {
        width: 100%;
        padding: 10px;
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

        padding: 5px 10px;
        font-family: inherit;
        font-size: 16px;
        border-radius: 4px;

        cursor: pointer;
      }

      button.selected,
      button.selected:hover,
      button.selected:active {
        color: white;
        background-color: #343;
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
