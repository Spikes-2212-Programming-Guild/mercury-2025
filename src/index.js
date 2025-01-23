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
const MultipleChoiceQuestion = require("./questions/MultipleChoiceQuestion");

const pages = [
    {
        name: "prePlay",
        questions: [
            new TextQuestion("name", "Enter your name"),
            new TextQuestion("teamColor", "Enter your team's alliance color"),
        ]
    },
    {
        name: "endGame",
        questions: [
            new MultipleChoiceQuestion("TeamNumber", "Enter your team's number", [2212, 1657, 1690, 3739]),
        ]
    }
];

pageCreator.generateAllPages(dirname, pages);

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// create the get requests for all pages
pages.forEach((page) => {
    app.get('/' + page.name, (req, res) => {
        res.sendFile(path.join(__dirname, dirname + page.name + '.html'));
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, dirname + pages[0].name + '.html'));
})

// check if column exist in the table
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
            } catch (err) {
                console.error('Error creating new columns to database:', err);
                return res.status(500).send('Error saving data');
            }
        }
    }

    try {
        let idArray = [];
        let answerArray = [];

        for (let [id, answer] of Object.entries(req.body)) {
            idArray.push(id);
            answerArray.push(`'${answer}'`);
        }

        const columns = idArray.join(", ");
        const values = answerArray.join(", ");

        const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        await db.query(insertQuery);

        console.log(answers);
        res.send('Thank you for submitting your answers!');
    } catch (err) {
        console.error('Error saving data', err);
        return res.status(500).send('Error saving data');
    }
});

// debug
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
