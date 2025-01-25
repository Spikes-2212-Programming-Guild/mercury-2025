const fs = require('fs');
const path = require('path');

function generateHTML(form) {
    let questionScripts = '';

    // Iterate through the pages and their questions
    for (const page of form.Pages) {
        console.log(page);
        for (const question of page) {
            const questionType = question.type;
            const questionPath = path.join(__dirname, 'questions', `${questionType}.js`);

            // Try reading the script file for the question type
            try {
                const scriptContent = fs.readFileSync(questionPath, 'utf-8');
                questionScripts += `// Script for ${questionType}\n${scriptContent}\n\n`;
            } catch (err) {
                console.error(`Error reading file "${questionPath}":`, err.message);
            }
        }
    }

    // Build the HTML
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Form</title>
</head>
<body>
    <script>
        // Embedded form JSON
        const form = ${JSON.stringify(form, null, 4)};
        
        // Embedded question scripts
        ${questionScripts}
    </script>
</body>
</html>
`;
}

function generateFile(outputPath, form) {
    const htmlContent = generateHTML(form);
    fs.writeFileSync(outputPath, htmlContent, 'utf-8');
    console.log(`HTML file successfully generated at ${outputPath}`);
}

// Export as an object
module.exports = {
    generateFile,
};
