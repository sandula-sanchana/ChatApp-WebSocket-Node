const WebSocket = require('ws');
const events = require("node:events");

const server_socket=new WebSocket.Server({port:2004});


server_socket.on('connection',(socket)=>{
    console.log("Client connected");

    socket.send("Welcome to the server!");


    socket.on('message',(msg)=>{
        console.log(`client says : ${msg}`)
    })
})

console.log("WebSocket server running on ws://localhost:2004");


