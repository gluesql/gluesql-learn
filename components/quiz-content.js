class GlueQuizContent extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    const h1 = document.createElement('h1');
    h1.textContent = 'GlueQuizContent';

    this.shadowRoot.append(style, h1);
  }

  connectedCallback() {
  }

  attributeChangedCallback() {
  }

  getStyle() {
    return `
      :host {
        display: inline-block;

        width: 300px;
        height: 300px;
        background-color: blue;
      }
    `;
  }
}

customElements.define('glue-quiz-content', GlueQuizContent);
