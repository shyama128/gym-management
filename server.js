const express = require('express');
const app = express();
const port = 3000;

// In-memory data to store gym members
let gymMembers = [];

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static('public'));  // To serve static HTML, CSS, JS files

// Route to get all gym members
app.get('/api/members', (req, res) => {
    res.json(gymMembers);
});

// Route to add a new gym member
app.post('/api/add_member', (req, res) => {
    const { name, email } = req.body;
    const newMember = { name, email };
    gymMembers.push(newMember);
    res.json({ message: 'Member added successfully!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
