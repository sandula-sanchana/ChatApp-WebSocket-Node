const WebSocket = require('ws');
const line=require('readline')

const socket = new WebSocket("ws://localhost:2004");

socket.on('open', () => {
    console.log("connected to server");
    socket.send("Hello server!");
});

socket.on('message', (msg) => {
    console.log("Server says:", msg.toString());
});

let rl=line.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt: 'Say something: '
})
rl.prompt();

rl.on('line',function (output){
    socket.send(output)
    rl.prompt();
})

