const WebSocket = require('ws');
const events = require("node:events");

const server_socket=new WebSocket.Server({port:2004});

const clients=[]

function broadCaster(){

}
server_socket.on('connection',(socket)=>{
    console.log("Client connected");
    socket.send("Welcome to the server!");
    clients.push(socket)

    socket.on('message',(msg)=>{
        console.log(`client says : ${msg}`)

        clients.map((s)=>{
            if (s !== socket) {
                s.send(msg.toString())
            }
        })
    })
})

console.log("WebSocket server running on ws://localhost:2004");


