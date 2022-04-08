class GlueQueryResult extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();

    const resultList = JSON.parse('[{"rows":[{"id":1,"name":"hello"},{"id":2,"name":"world"}],"type":"SELECT"},{"type":"CREATE TABLE"}]');

    const div = document.createElement('div');
    div.innerHTML = this.render(resultList);

    this.shadowRoot.append(style, div);
  }

  connectedCallback() {
  }

  attributeChangedCallback() {
  }

  render(resultList) {
    return resultList
      .map(result => this.renderResult(result))
      .join('');
  }

  renderResult(result) {
    switch (result.type) {
      case 'SELECT':
        return `
          <section>
            <code>[success] SELECT</code>
            <glue-table-viewer data-rows="${JSON.stringify(result.rows)}"></glue-table-viewer>
          </section>
        `;
      default:
        return `
          <section>
            <code>[success] ${result.type}</code>
          </section>
        `;
    }
  }

  getStyle() {
    return `
      :host {
        display: inline-block;
        background-color: white;

        padding: 20px;
        border-top: 1px solid #ddd;
        overflow: auto;
      }

      section {
        margin-bottom: 30px;
      }

      code {
        font-family: 'Roboto Mono', monospace;
      }

      glue-table-viewer {
        display: block;
        width: 100%;
      }
    `;
  }
}

customElements.define('glue-query-result', GlueQueryResult);
