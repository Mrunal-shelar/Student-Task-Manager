// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });


//   // Set up Express app
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/student_tasks', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define Task schema and model
// const taskSchema = new mongoose.Schema({
//     courseId: String,
//     taskName: String,
//     dueDate: String,
//     details: String
// });

// const Task = mongoose.model('Task', taskSchema);
  

// // Route to add a new task
// app.post('/tasks', async (req, res) => {
//     try {
//         const { courseId, taskName, dueDate, details } = req.body;
//         const newTask = new Task({ courseId, taskName, dueDate, details });
//         await newTask.save();
//         res.json({ message: 'Task added successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to add task' });
//     }
// });

// // Route to fetch tasks by course ID
// app.get('/courses/:courseId/tasks', async (req, res) => {
//     try {
//         const { courseId } = req.params;
//         const tasks = await Task.find({ courseId });
//         if (tasks.length > 0) {
//             res.json(tasks);
//         } else {
//             res.json([]);
//         }
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch tasks' });
//     }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });








const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Set up Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files (HTML, CSS, JS)
 app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_tasks', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Task schema and model
const taskSchema = new mongoose.Schema({
    courseId: String,
    taskName: String,
    dueDate: String,
    details: String
});

const Task = mongoose.model('Task', taskSchema);

// Route to add a new task
app.post('/tasks', async (req, res) => {
    try {
        const { courseId, taskName, dueDate, details } = req.body;
        const newTask = new Task({ courseId, taskName, dueDate, details });
        await newTask.save();
        res.json({ message: 'Task added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add task' });
    }
});

// Route to fetch tasks by course ID
app.get('/courses/:courseId/tasks', async (req, res) => {
    try {
        const { courseId } = req.params;
        const tasks = await Task.find({ courseId });
        if (tasks.length > 0) {
            res.json(tasks);
        } else {
            res.json([]);
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Serve the frontend (index.html) when visiting localhost:3000
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
