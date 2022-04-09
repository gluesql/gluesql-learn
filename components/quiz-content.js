class GlueQuizContent extends HTMLElement {
  static get observedAttributes() {
    return ["data-content", "expected-result"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = this.getStyle();
    const section = document.createElement("section");

    this.shadowRoot.append(style, section);
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const section = this.shadowRoot.querySelector("section");

    if (!this.hasAttribute("data-content")) {
      section.innerHTML = "";

      return;
    }

    const { category, name, schemaSQL, dataList } = JSON.parse(
      this.getAttribute("data-content")
    );

    const expectedResult = JSON.parse(this.getAttribute("expected-result"));

    section.innerHTML = `
      <p class="breadcrumb">
        <span class="category">${category}</span>
        <span class="divider">/</span>
        <span class="title">${name}</span>
      </p>
      <h1>${name}</h1>

      <h3>Schema</h3>
      <pre>${schemaSQL}</pre>

      <h3>Data</h3>
      ${dataList.map((data) => this.renderData(data)).join("")}

      <h3>Expected Result</h3>
      ${this.renderExpectedResult(expectedResult)}
    `;
  }

  renderData({ name, rows }) {
    return `
      <p>${name}</p>
      <glue-table-viewer data-rows='${JSON.stringify(rows)}'>
      </glue-table-viewer>
    `;
  }

  renderExpectedResult(rows) {
    return `
      <glue-table-viewer data-rows='${JSON.stringify(
        rows
      )}'></glue-table-viewer>
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

        padding: 15px 10px;
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

customElements.define("glue-quiz-content", GlueQuizContent);
