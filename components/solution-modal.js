class GlueSolutionModal extends HTMLElement {
  static get observedAttributes() { return ['data-sql'] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();

    const main = document.createElement('main');

    this.shadowRoot.append(style, main);
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const main = this.shadowRoot.querySelector('main');

    if (!this.hasAttribute('data-sql')) {
      main.setAttribute('class', 'hidden');
      return;
    }

    main.removeAttribute('class');
    main.innerHTML = `
      <div class="modal">
        <glue-code-editor></glue-code-editor>
        <button>close</button>
      </div>
    `;

    main
      .querySelector('button')
      .addEventListener('click', this.close.bind(this));
  }

  close() {
    this.removeAttribute('data-sql');
    this.update();
  }

  getStyle() {
    return `
      :host {
        position: fixed;
      }

      main.hidden {
        display: none;
      }

      main {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);

        display: flex;
        align-items: center;
        justify-content: center;
      }

      div.modal {
        width: 400px;
        height: 300px;
        padding: 30px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 6px;

        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
      }

      glue-code-editor {
        width: 100%;
        flex-grow: 1;
      }

      button {
        width: 80px;
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

customElements.define('glue-solution-modal', GlueSolutionModal);
