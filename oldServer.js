const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve everything in "old" as static files
app.use(express.static(path.join(__dirname, "old")));

// Default route → serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "old", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
