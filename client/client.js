const WebSocket = require('ws');

const socket = new WebSocket("ws://localhost:2004");

socket.on('open', () => {
    console.log("connected to server");

    // Optionally send a message
    socket.send("Hello server!");
});

socket.on('message', (msg) => {
    console.log("Server says:", msg.toString());
});