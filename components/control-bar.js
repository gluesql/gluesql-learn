class GlueControlBar extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    const h1 = document.createElement('h1');
    h1.textContent = 'GlueControlBar';

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

        background-color: #caa14a;
      }

      h1 {
        margin: 0;
        padding: 0;
      }
    `;
  }
}

customElements.define('glue-control-bar', GlueControlBar);
