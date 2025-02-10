const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile('/home/itay/WebstormProjects/mercury-2025/docs/index.html');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
