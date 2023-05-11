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

cnx();

app.post('/', (req, res)=>{
    data = req.body
    channel.sendToQueue(queue1, Buffer.from(JSON.stringify(data)))
    res.end();
})

app.listen(3000, ()=>{
    console.log("server working...");
})