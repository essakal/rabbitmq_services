const express = require("express");
const app = express();
const amqp = require("amqplib");
app.use(express.json())

let connection, channel;
const queue1 = "s-file1";
// const queue2 = "s-file2";

async function cnx(){
    const amqpserver = "amqp://guest:guest@localhost:5672";
    connection = await amqp.connect(amqpserver);
    channel = await connection.createChannel();
    await channel.assertQueue(queue1);
}

cnx().then(()=>{
    channel.consume(queue1, data=>{
        console.log(JSON.parse(data.content))
        channel.ack(data)
    })
})


app.listen(3001, ()=>{
    console.log("server2 working...")
})