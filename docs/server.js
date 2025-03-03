const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile("/home/itay/WebstormProjects/mercury-2025/docs/index.html");
});

app.get("/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, "styles.css"));
});

app.get("/scripts/App.js", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "App.js"));
});

app.get("/scripts/PageManager.js", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "PageManager.js"));
});

app.get("/scripts/SubmissionHandler.js", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "SubmissionHandler.js"));
});

app.get("/scripts/QuestionManager.js", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "QuestionManager.js"));
});

app.get("/scripts/Config.js", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "Config.js"));
});

app.get("/scripts/TitleManager.js", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "TitleManager.js"));
});

app.get("/questions/SingleNumberQuestion.js", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "SingleNumberQuestion.js"));
});

app.get("/questions/Question.js", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "Question.js"));
});

app.get("/questions/NumberFromChoicesQuestion.js", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "NumberFromChoicesQuestion.js"));
});

app.get("/questions/SelectQuestion.js", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "SelectQuestion.js"));
});

app.get("/questions/TextboxQuestion.js", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "TextboxQuestion.js"));
});

app.get("/questions/TextLineQuestion.js", (questions, res) => {
    res.sendFile(path.join(__dirname, "questions", "TextLineQuestion.js"));
});

app.get("/questions/CounterQuestion.js", (questions, res) => {
    res.sendFile(path.join(__dirname, "questions", "CounterQuestion.js"));
});

app.get("/scripts/NavigationManager.js", (questions, res) => {
    res.sendFile(path.join(__dirname, "scripts", "NavigationManager.js"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
