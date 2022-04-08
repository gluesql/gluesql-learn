class GlueTableViewer extends HTMLElement {
  static get observedAttributes() { return [] }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();

    const table = document.createElement('table')
    table.innerHTML = `
      ${this.renderTableHeader([
        'Name',
        'Age',
        'Temp'
      ])}
      ${this.renderTableBody([
        ['1', '2', '3'],
        ['4', '5', '6'],
      ])}
    `

    this.shadowRoot.append(style, table);
  }

  connectedCallback() {
  }

  attributeChangedCallback() {
  }

  renderTableHeader(headers) {
    return `
      <thead>
        <tr>
          ${headers.map(header => `<th>${header}</th>`).join('')}
        </tr>
      </thead>
    `
  }

  renderTableBody(rows) {
    return `
      <tbody>
        ${rows.map(row => `<tr>${row.map(data => `<td>${data}</td>`).join('')}</tr>`).join('')}
      </tbody>
    `;
  }

  getStyle() {
    return `
      :host {
        display: inline-block;
      }

      table {
        margin: 6px 12px;
        width: calc(100% - 24px);
        overflow: hidden;
        box-sizing: border-box;
        border-collapse: collapse;
      }

      td, th {
        width: 14.29%;
        height: 34px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;

        border: 1px solid #172334;
      }

      th {
        color: #6B7280;
      }

      td {
        text-align: center;

        color: #111827;
      }
    `;
  }
}

customElements.define('glue-table-viewer', GlueTableViewer);
