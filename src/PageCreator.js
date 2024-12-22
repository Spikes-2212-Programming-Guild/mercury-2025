function createPage(pathName, add) {
    let htmlContent =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated HTML File</title>
</head>
<body>
    <div id="container">
    
    </div>
</body>
</html>`;
    htmlContent += add;
    const fs = require('fs');
    const path = require('path');

    const htmlFilePath = path.join(__dirname, pathName);

    fs.writeFile(htmlFilePath, htmlContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('HTML file generated successfully at:', htmlFilePath);
        }
    });
}

module.exports = {
    createPage
};