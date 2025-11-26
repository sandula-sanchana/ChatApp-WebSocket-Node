const WebSocket = require('ws');
const events = require("node:events");

const server_socket=new WebSocket.Server({port:2004});

const clients=[]

server_socket.on('connection',(socket)=>{
    console.log("Client connected");
    socket.send(JSON.stringify({
        type: "system",
        msg: "Welcome to the server!"
    }));
    clients.push(socket)

    socket.on('message',(msg)=>{
        console.log(`client says : ${msg}`)

        const data=JSON.parse(msg);

        if (data.type === "message") {
            clients.forEach(s => {
                if (s !== socket) {
                    s.send(JSON.stringify({
                        type: "message",
                        msg: `${socket.username}: ${data.msg}`
                    }));
                }
            });
        }

        if (data.type === "typing") {
            clients.forEach(s => {
                if (s !== socket) {
                    s.send(JSON.stringify({
                        type: "typing",
                        msg: `${socket.username} is typing...`
                    }));
                }
            });
        }

        if(data.type==="username"){
            socket.username=data.username;
            console.log(`User set username: ${socket.username}`);

        }

    })
})

console.log("WebSocket server running on ws://localhost:2004");


