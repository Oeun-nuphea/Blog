const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const amqp = require('amqplib')

const app = express()
const port = 3002

app.use(bodyParser.json())

mongoose.connect('mongodb://mongo:27017/tasks')
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log("MongoDB connection error", err))

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    createAt:{
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.model('Task', TaskSchema)

let channel, connection;

async function connectRabbitMQWithRetry(retries = 5,  delay = 3000) {
    while(retries){
        try{
            connection = await amqp.connect("amqp://rabbitmq")
            channel = await connection.createChannel()
            await channel.assertQueue("task_created")
            console.log("Connected to RabbitMQ");
            return;
            
        }catch(error){
            console.error("RabbitMQ Connection Error", error.message)
            retries--;
            console.error("Retrying again", retries)
            await new Promise(res=>setTimeout(res, delay));
        }
    }
}

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks)
})


app.post('/tasks', async(req, res)=>{
    const {title, description, userId} = req.body;

    try{
        const task = new Task({title, description, userId})
        await task.save()

        const message = {taskId: task._id, userId, title}

        if(!channel){
            return res.status(503).json({
                error: "RabbitMQ is not connect"
            })
        }

        channel.sendToQueue("task_created", Buffer.from(
            JSON.stringify(message)
        ))

        res.status(201).json(task)
    }
    catch(err){
        console.log('Error saving', err)
        res.status(500).json({err: "Internal Server Error"})
    }
})


app.listen(port, ()=>{
    console.log(`Task Service listening on the port ${port}`)
    connectRabbitMQWithRetry();
})