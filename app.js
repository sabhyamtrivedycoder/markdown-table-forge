function generateMarkdownTable(headers, rows) {
  let md = '| ' + headers.join(' | ') + ' |\n';
  md += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
  rows.forEach(r => {
    md += '| ' + r.join(' | ') + ' |\n';
  });
  return md;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    let headers = ['Project', 'Category', 'Status'];
    let rows = [
      ['Spark2Ship', 'AI Reasoning', 'Production'],
      ['sabhyamai.in', 'Generative Vision', 'Live'],
      ['HoloVerse AI', 'Spatial 3D', 'Deployed']
    ];

    function render() {
      const container = document.getElementById('tableContainer');
      let html = '<table><thead><tr>' + headers.map((h, i) => `<th><input value="${h}" data-h="${i}"></th>`).join('') + '</tr></thead><tbody>';
      rows.forEach((r, rIdx) => {
        html += '<tr>' + r.map((c, cIdx) => `<td><input value="${c}" data-r="${rIdx}" data-c="${cIdx}"></td>`).join('') + '</tr>';
      });
      html += '</tbody></table>';
      container.innerHTML = html;
      document.getElementById('mdOutput').textContent = generateMarkdownTable(headers, rows);

      container.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          if (e.target.dataset.h !== undefined) headers[e.target.dataset.h] = e.target.value;
          else rows[e.target.dataset.r][e.target.dataset.c] = e.target.value;
          document.getElementById('mdOutput').textContent = generateMarkdownTable(headers, rows);
        });
      });
    }

    document.getElementById('addRowBtn').addEventListener('click', () => {
      rows.push(headers.map(() => 'New Cell')); render();
    });
    document.getElementById('addColBtn').addEventListener('click', () => {
      headers.push('Header'); rows.forEach(r => r.push('Data')); render();
    });
    document.getElementById('copyBtn').addEventListener('click', () => {
      navigator.clipboard.writeText(generateMarkdownTable(headers, rows));
      alert('Markdown table copied!');
    });
    render();
  });
}
if (typeof module !== 'undefined') module.exports = { generateMarkdownTable };
