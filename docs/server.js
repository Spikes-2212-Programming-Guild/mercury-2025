const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the project directory (adjust if needed)
app.use(express.static(path.join(__dirname, "scripts"))); // Ensure scripts are accessible

app.get("/", (req, res) => {
    res.sendFile("/home/itay/WebstormProjects/mercury-2025/docs/index.html");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
