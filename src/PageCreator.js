function createPage(pathName, content) {
    let htmlContent =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
</head>
<body>`;
    htmlContent += content;
    htmlContent += '\n</body>\n</html>' // to make sure the content is in body
    const fs = require('fs');
    const path = require('path');

    const htmlFilePath = path.join(__dirname, pathName);

    fs.writeFile(htmlFilePath, htmlContent, 'utf8', (error) => {
        if (error) {
            console.error('Error writing to file:', error);
        } else {
            console.log('HTML file generated successfully at:', htmlFilePath);
        }
    });
}

module.exports = {
    createPage
};