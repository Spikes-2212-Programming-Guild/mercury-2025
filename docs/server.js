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

app.get("/scripts/PageManager", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "PageManager.js"));
});

app.get("/scripts/SubmissionHandler", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "SubmissionHandler.js"));
});

app.get("/scripts/QuestionManager", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "QuestionManager.js"));
});

app.get("/config/constants", (req, res) => {
    res.sendFile(path.join(__dirname, "config", "constants.js"));
});

app.get("/config/questions", (req, res) => {
    res.sendFile(path.join(__dirname, "config", "questions.js"));
});

app.get("/scripts/NavigationManager", (questions, res) => {
    res.sendFile(path.join(__dirname, "scripts", "NavigationManager.js"));
});

app.get("/scripts/TitleManager", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "TitleManager.js"));
});

app.get("/scripts/event-listener-manager", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "event-listener-manager.js"));
});

app.get("/scripts/GameRemindManager", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "GameRemindManager.js"));
});

app.get("/scripts/data-manager", (req, res) => {
    res.sendFile(path.join(__dirname, "scripts", "data-manager.js"));
});

app.get("/questions/SingleNumberQuestion", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "SingleNumberQuestion.js"));
});

app.get("/questions/Question", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "Question.js"));
});

app.get("/questions/NumberFromChoicesQuestion", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "NumberFromChoicesQuestion.js"));
});

app.get("/questions/SelectQuestion", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "SelectQuestion.js"));
});

app.get("/questions/TextboxQuestion", (req, res) => {
    res.sendFile(path.join(__dirname, "questions", "TextboxQuestion.js"));
});

app.get("/questions/TextLineQuestion", (questions, res) => {
    res.sendFile(path.join(__dirname, "questions", "TextLineQuestion.js"));
});

app.get("/questions/CounterQuestion", (questions, res) => {
    res.sendFile(path.join(__dirname, "questions", "CounterQuestion.js"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
