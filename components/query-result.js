class GlueQueryResult extends HTMLElement {
  static get observedAttributes() { return ['data-query-result'] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();

    const div = document.createElement('div');

    this.shadowRoot.append(style, div);
  }

  connectedCallback() {
  }

  attributeChangedCallback() {
    if(this.hasAttribute('data-query-result')) {
      const resultList = JSON.parse(this.getAttribute('data-query-result'));

      const div = this.shadowRoot.querySelector('div');
      div.innerHTML = this.render(resultList);
    }
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
            <glue-table-viewer data-rows='${JSON.stringify(result.rows)}'></glue-table-viewer>
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
