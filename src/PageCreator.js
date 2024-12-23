const fs = require('fs');
const path = require('path');

function generatePage(filePath, questions) {
    let addedContent = questions.map(question => question.generateHTML()).join('\n');
    // Construct the complete HTML content
    const htmlContent =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
</head>
<body>
    ${addedContent}
</body>
<script>
    // Get all question elements
    const questions = [${questions.map(q => `document.getElementById('${q.id}')`).join(', ')}];

    // Set initial values from sessionStorage and add input event listeners
    questions.forEach(q => {
        const storedValue = window.sessionStorage.getItem(q.id);
        if (storedValue) {
            q.value = storedValue;
        }

        q.addEventListener('input', (event) => {
            window.sessionStorage.setItem(event.target.id, event.target.value);
        });
    });
</script>
</html>`;

    // Define the full path for the HTML file
    const htmlFilePath = path.join(__dirname, filePath);

    // Write the HTML content to the file
    fs.writeFile(htmlFilePath, htmlContent, (error) => {
        if (error) {
            console.error('Error writing to file:', error);
        } else {
            console.log('HTML file created successfully at:', htmlFilePath);
        }
    });
}

module.exports = {
    generatePage
};