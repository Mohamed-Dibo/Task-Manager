const Task = require("../Model/TaskModel");

const getAllTasks =  async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
}
const createTask = async (req, res) => {
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
};
const getSpicificTask =  async (req, res) => {
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
}
const updateTask = async (req, res) => {
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
}
const deleteTask = async (req, res) => {
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
}

module.exports = {getAllTasks, createTask, getSpicificTask,updateTask,deleteTask}
