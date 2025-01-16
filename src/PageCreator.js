const fs = require('fs');
const path = require('path');

function generateAllPages(filePath, pages) {
    for (let i = 0; i < pages.length; i++) {
        let nextFileName = (i < pages.length - 1) ? pages[i + 1].name : null;
        let prevFileName = (i > 0) ? pages[i - 1].name : null;

        generatePage(filePath, pages[i].name, pages[i].questions, prevFileName, nextFileName);
    }
}

function generatePage(filePath, fileName, questions, prevFileName, nextFileName) {
    let questionButtons = questions.map(question => question.generateHTML()).join('\n');
    let submitButton = '';
    let submitScript = '';

    // Add submit button and script on the last page
    if (!nextFileName) {
        submitButton = '<button onClick="submit()">Submit</button>';
        submitScript = `
    async function submit() {
        const formData = {};
        Object.keys(localStorage).forEach(key => {
            formData[key] = localStorage.getItem(key);
        });
        console.log(formData);

        try {
            const response = await fetch("http://localhost:3000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Form data inserted successfully");
            } else {
                alert("Error inserting form data");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error inserting form data");
        }
    }
`;
    }

    // HTML for previous and next buttons
    let navButtons = '';
    if (prevFileName) {
        navButtons += `<button onClick="window.location.href='${prevFileName}'">Previous</button>`;
    }
    if (nextFileName) {
        navButtons += `<button onClick="window.location.href='${nextFileName}'">Next</button>`;
    }

    const htmlContent =
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
</head>
<body>
    <h1>${fileName}</h1>
    
    ${questionButtons}
    
    ${submitButton}
    
    ${navButtons}
</body>
<script>
    window.onload = () => { // make sure the file loads before the code runs
        // Get all question elements
        const questions = [${questions.map(q => `document.getElementById('${q.id}')`).join(', ')}];
    
        // Set initial values from localStorage and add input event listeners
        questions.forEach(q => {
            const storedValue = localStorage.getItem(q.id);
            if (storedValue) {
                q.value = storedValue;
            }
    
            q.addEventListener('input', (event) => {
                localStorage.setItem(event.target.id, event.target.value);
            });
        });
    }
    ${submitScript}
</script>
</html>`;

    const htmlFilePath = path.join(__dirname, filePath + fileName + '.html');
    fs.writeFile(htmlFilePath, htmlContent, (error) => {
        if (error) {
            console.error('Error writing to file:', error);
        } else {
            console.log('HTML file created successfully at:', htmlFilePath);
        }
    });
}

module.exports = {
    generateAllPages
};