const amqp = require('amqplib')


async function start() {
    try{
        connection = await amqp.connect("amqp://rabbitmq");
        channel = await connection.createChannel();

        await channel.assertQueue("task_created")
        console.log("Notification service is listening to messages")

        channel.consume("task_created", (msg) =>{
            const taskData = JSON.parse(msg.content.toString())
            console.log("Notification: New Task: ", taskData.title)
            console.log("Notification: New Task: ", taskData)
            channel.ack(msg)
        })
    }
    catch(err){
        console.error("RabbitMQ Connection Error: ", err.message)
    }

}
start()