class GlueCodeEditor extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    const h1 = document.createElement('h1');
    h1.textContent = 'GlueCodeEditor';

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

        background-color: #ea19ca;
      }
    `;
  }
}

customElements.define('glue-code-editor', GlueCodeEditor);
