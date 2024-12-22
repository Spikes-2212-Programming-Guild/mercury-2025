const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const db = require('./db')
const cors = require('cors')

const pageCreator = require('./PageCreator')
const TextQuestion = require("./questions/TextQuestion");

let content = ''
content += new TextQuestion('text', 'enter text', 'username').generateHTML();
content += new TextQuestion('text', 'enter your favorite snack', 'snack-name').generateHTML();

pageCreator.createPage('pages/page1.html', content)
// TODO - a class that makes the relations between pages - back and next page

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/page1.html'));
    // res.sendFile(path.join(__dirname,'pages/index.html'));
})

app.get('/data', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM usernames');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/insert-username', (req, res) => {
    try {
        const name = req.body.username;
        db.query("INSERT INTO usernames (username) VALUES ($1)", [name]);
        res.status(200).send('Submitted username');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting username');
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port }`);
})
