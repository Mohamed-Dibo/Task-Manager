const express = require('express');
const connectDB = require('./utils/connectDataBase');
const Task = require('./Model/TaskModel')
const taskRouter = require('./Routes/taskRouter')

const app = express()

app.use(express.json())

// Connect to MongoDB
connectDB()


// routes
app.use('/api/v1/tasks',taskRouter);


const PORT = 3000

app.listen(PORT , ()=>console.log(`server is running in port ${PORT}`))
