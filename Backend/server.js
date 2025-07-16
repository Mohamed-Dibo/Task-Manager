const express = require('express')

const app = express()


app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello world')
})


// routes

// get all tasks
app.get('/api/v1/tasks',(req,res)=>{
    res.send('get all tasks')
})

// get one tasks
app.get('/api/v1/tasks/:id',(req,res)=>{
    res.send('get specifiec task')
})

// create task
app.post('/api/v1/tasks',(req,res)=>{
    res.send('create task')
})
// update task
app.patch('/api/v1/tasks/:id',(req,res)=>{
    res.send('update task')
})
// delete task
app.delete('/api/v1/tasks/:id',(req,res)=>{
    res.send('delete task')
})




const PORT = 3000

app.listen(PORT , ()=>console.log(`server is running in port ${PORT}`))
