const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3000
const tableName = 'games'
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = 'https://kkbudtrzmdwfydjhttgt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYnVkdHJ6bWR3Znlkamh0dGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NjUwOTAsImV4cCI6MjA1NDM0MTA5MH0._OW4uS7Fnt_RbcXcMpwp4htcliee6WsKxRTFKNgnm5w'
const supabase = createClient(supabaseUrl, supabaseKey)

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/submit', async (req, res) => {
    const answers = {};
    for (const [id, answer] of Object.entries(req.body)) {
        if (answer) answers[id] = answer;  // Store as key-value pairs in a single object
    }

    const { error } = await supabase.from(tableName).insert([answers]);

    if (error) {
        console.error('Error saving data:', error);
        return res.status(500).send('Error saving data');
    } else {
        res.send('Thank you for submitting your answers!');
        console.log(answers);
    }
});

// debug
app.get("/data", async (req, res) => {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
        console.error("Error fetching data:", error);
    } else {
        res.json(data);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
