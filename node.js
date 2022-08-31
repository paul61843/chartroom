const express = require('express');
const SocketServer = require('ws').Server;

const app = express();
const PORT = 5500;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

const socket = new SocketServer({ server })

socket.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', data => {
        data = data.toString();
        
        let clients = socket.clients;
        clients.forEach(client => {
            client.send(data);
        })
    })

    ws.on('close', () => {
        console.log('close connected');
    })
})

module.exports = app;
