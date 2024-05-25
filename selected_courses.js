// selected_courses.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Dummy database to store user selections
let userCourses = {};

app.post('/api/saveCourses', (req, res) => {
    const userId = req.user.id; // user authentication in place
    const courses = req.body.courses;

    if (!userId || !courses) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    userCourses[userId] = courses;
    res.json({ success: true });
});

app.get('/api/getCourses', (req, res) => {
    const userId = req.user.id; // user authentication

    if (!userId || !userCourses[userId]) {
        return res.status(400).json({ success: false, message: 'No courses found' });
    }

    res.json({ success: true, courses: userCourses[userId] });
});

// middleware for user authentication
app.use((req, res, next) => {
    req.user = { id: '123' }; // Mock user authentication for testing
    next();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
