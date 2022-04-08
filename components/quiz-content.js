class GlueQuizContent extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    const section = document.createElement('section');
    section.innerHTML = this.render();

    this.shadowRoot.append(style, section);
  }

  connectedCallback() {
  }

  attributeChangedCallback() {
  }

  render() {
    return `
      <p class="breadcrumb">
        <span class="category">Sample category</span>
        <span class="divider">/</span>
        <span class="title">Sample quiz</span>
      </p>
      <h1>Sample quiz</h1>

      <h3>Schema</h3>
      <pre>
CREATE TABLE Foo (id INTEGER);

CREATE TABLE Bar (
  id INTEGER,
  foo_id INTEGER
);
      </pre>

      <h3>Data</h3>
      <p>Foo</p>
      <glue-table-viewer></glue-table-viewer>

      <p>Bar</p>
      <glue-table-viewer></glue-table-viewer>
    `;
  }

  getStyle() {
    return `
      :host {
        display: inline-block;

        padding: 20px;
        background-color: white;

        overflow-x: hidden;
        overflow-y: auto;
        border-right: 1px solid #ddd;
      }

      p.breadcrumb {
        margin-top: 0;
        font-size: 12px;
      }

      p.breadcrumb span.category {
        color: #888;
      }

      p.breadcrumb span.divider {
        opacity: 0.5;
      }

      p.breadcrumb span.title {
        color: #333;
      }

      h1 {
        margin: 10px 0 20px 0;
      }

      h3 {
        margin: 30px 0 5px 0;
      }

      p {
        margin: 5px 0;
      }

      pre {
        font-family: 'Roboto Mono';

        padding: 15px 10px 0 15px;
        background-color: #353535;
        border-radius: 6px;
        color: white;
        overflow-x: auto;
      }

      glue-table-viewer {
        width: 100%;
      }
    `;
  }
}

customElements.define('glue-quiz-content', GlueQuizContent);
