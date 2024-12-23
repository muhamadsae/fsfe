const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});

})

server.on('request', app);
server.listen(3000, function() {console.log('Server started on port 3000');});

// Begin websocket
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
    server: server
});

wss.on('connection', function(wss) {
    const numClients = wss.clients.size;
    console.log('Clients connected', numClients);

    wss.broacast(`Current visitors: ${numClients} `);

    if (ws.readState === ws.OPEN) {
        ws.send('Welcome to my server');
    }

    ws.on('close', function close() {
        wss.broadcast(`Current Visitors: ${numClients}`);
        console.log('A Client has dissconnected');
    })

})

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
}