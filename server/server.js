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

        const data=JSON.parse(msg);

        if(data.type==="message"){
            clients.map((s)=>{
                if (s !== socket) {
                    s.send(`${socket.username}: `+data.msg.toString())
                }
            })
        }

        if(data.type==="username"){
            socket.username=data.username;
            console.log(`User set username: ${socket.username}`);

        }

        if(data.type==="typing"){
            clients.map((s)=>{
                if (s !== socket) {
                    s.send(`${socket.username}: is typing...`)
                }
            })
        }






    })
})

console.log("WebSocket server running on ws://localhost:2004");


