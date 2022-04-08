class GlueControlBar extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();

    const controls = document.createElement('div');
    controls.innerHTML = this.render();

    this.shadowRoot.append(style, controls);
  }

  connectedCallback() {
    const names = ['prev', 'next', 'solution', 'run', 'submit'];

    for (const name of names) {
      this
        .shadowRoot
        .querySelector(`button.${name}`)
        .addEventListener('click', this.dispatch.bind(this, name));
    }
  }

  attributeChangedCallback() {
  }

  dispatch(eventName) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return `
      <button class="prev">Prev</button>
      <button class="next">Next</button>

      <span></span>

      <button class="solution">Solution</button>
      <button class="run">Run</button>
      <button class="submit">Submit</button>
    `;
  }

  getStyle() {
    return `
      :host {
        display: inline-block;

        border-top: 1px solid #ddd;
        background-color: white;
        padding: 0 15px;
      }

      div {
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-columns:
          80px 80px 1fr 100px 100px 100px;
        align-content: center;

        gap: 10px;
      }

      button {
        height: 40px;
        border: none;

        box-shadow: none;
        background-color: #657;
        border-radius: 8px;
        box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.2);
        color: #eaeaea;
        text-transform: uppercase;
        cursor: pointer;
      }

      button:hover {
        opacity: 0.8;
      }

      button:active {
        opacity: 0.6;
      }
    `;
  }
}

customElements.define('glue-control-bar', GlueControlBar);
