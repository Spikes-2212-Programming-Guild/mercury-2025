const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "docs")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "docs", "index.html"));
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "logo.svg"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
