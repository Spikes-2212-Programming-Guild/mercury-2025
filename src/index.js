const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const db = require("./db");
const cors = require("cors");
const tableName = 'robot';
const dirname = 'pages/';

const pageCreator = require("./PageCreator");
const TextQuestion = require("./questions/TextQuestion");

const pages = [
    {
        name: "test1",
        questions: [
            new TextQuestion("username", "Enter text"),
            new TextQuestion("color", "Enter your favorite color"),
        ]
    },
    {
        name: "test2",
        questions: [
            new TextQuestion("age", "Enter age"),
        ]
    }
];

pageCreator.generateAllPages(dirname, pages);

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

pages.forEach((page) => {
    app.get('/' + page.name, (req, res) => {
        res.sendFile(path.join(__dirname, dirname + page.name + '.html'));
    });
});

const columnQuery = `SELECT column_name FROM information_schema.columns
                     WHERE table_name = $1 AND column_name = $2`;

app.post('/submit', async (req, res) => {
    const answers = [];

    for (const [id, answer] of Object.entries(req.body)) {
        if (answer) {
            answers.push({ [id]: answer });
            try {
                // Dynamically check if the column exists
                const columnResult = await db.query(columnQuery, [tableName, id]);

                // Column doesn't exist, so add it
                if (columnResult.rows.length === 0) {
                    await db.query(`ALTER TABLE ${tableName} ADD COLUMN ${id} TEXT`);
                }

                // Insert data
                const insertQuery = `INSERT INTO ${tableName} (${id}) VALUES ($1)`;
                await db.query(insertQuery, [answer]);
            } catch (err) {
                console.error('Error inserting data into database:', err);
                return res.status(500).send('Error saving data');
            }
        }
    }

    console.log(answers);
    res.send('Thank you for submitting your answers!');
});

app.get("/data", async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM ${tableName}`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
