
const express = require('express');
const app = express();
const PORT = 3000;

app.get('*', (req, res) => {
  // Get all headers and sort them alphabetically
  const headers = Object.keys(req.headers)
    .sort()
    .map(key => ({ name: key, value: req.headers[key] }));

  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Request Headers Echo</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .highlight { background-color: #ffffcc; }
        .info { background-color: #e7f3ff; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="info">
        <strong>Request Info:</strong><br>
        Method: ${req.method}<br>
        URL: ${req.url}<br>
        Path: ${req.path}<br>
        Server Time: ${new Date().toISOString()}
    </div>
    
    <h2>Request Headers (${headers.length} total)</h2>
    <table>
        <thead>
            <tr>
                <th>Header Name</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            ${headers.map(header => `
                <tr${header.name === 'host' ? ' class="highlight"' : ''}>
                    <td><strong>${header.name}</strong></td>
                    <td>${header.value}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div style="margin-top: 20px; font-size: 12px; color: #666;">
        * Host header is highlighted in yellow
    </div>
</body>
</html>`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Header echo server running on port ${PORT}`);
});