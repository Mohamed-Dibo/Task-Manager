const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task_manager', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    level:{
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);


// routes
// create task
app.post('/api/v1/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
});

// get all tasks
app.get('/api/v1/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// get one task
app.get('/api/v1/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(400).json({ success: false, error: 'Invalid task ID' });
        } else {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
});


// update task
app.patch('/api/v1/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ success: false, error: error.message });
        } else if (error.name === 'CastError') {
            res.status(400).json({ success: false, error: 'Invalid task ID' });
        } else {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
});

// delete task
app.delete('/api/v1/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(400).json({ success: false, error: 'Invalid task ID' });
        } else {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
});




const PORT = 3000

app.listen(PORT , ()=>console.log(`server is running in port ${PORT}`))
