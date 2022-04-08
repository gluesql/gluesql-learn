import 'https://pagecdn.io/lib/ace/1.4.14/ace.min.js'

const CDN_URL = `https://pagecdn.io/lib/ace/1.4.14/`

class GlueCodeEditor extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();
    ace.config.set('basePath', CDN_URL)

    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();

    const dom = require("ace/lib/dom");
    dom.buildDom([
      ["div", {id: "sql-editor"}],
      ["style", this.getEditorStyle()]
    ], shadow)

    const sqlEditorElem = this.shadowRoot.querySelector('#sql-editor')
    const sqlEditor = ace.edit(sqlEditorElem, {
      mode: "ace/mode/sql",
      value: "CREATE TABLE ITEM (id Integer)",
      autoScrollEditorIntoView: true,
    })

    sqlEditor.on('input', () => {
      const text = this.sqlEditor.getValue()
      sqlEditorElem.dispatchEvent(new CustomEvent("change", {
        bubbles: true, 
        composed: true, 
        detail: text,
      }));
    })

    this.sqlEditor = sqlEditor
    sqlEditor.renderer.attachToShadowRoot();
  }

  connectedCallback() {
  }

  attributeChangedCallback() {
  }

  getStyle() {
    return `
      :host {}
    `;
  }

  getEditorStyle() {
    return `
      #sql-editor {
        grid-area: html;
        height: 100%;
      }
  `;
  }
}

customElements.define('glue-code-editor', GlueCodeEditor);
