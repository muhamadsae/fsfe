const express = require('express');
const server = require('http').createServer();
const app = express();

// Menyajikan file index.html
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

// Menghubungkan Express dengan HTTP server
server.on('request', app);
server.listen(3000, function() {
    console.log('Server started on port 3000');
});

// Menginisialisasi WebSocket
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
    server: server
});

// Ketika klien terkoneksi ke WebSocket server
wss.on('connection', function(ws) {
    // Menampilkan jumlah klien yang terhubung
    const numClients = wss.clients.size;
    console.log('Clients connected:', numClients);

    // Mengirimkan informasi jumlah klien terkoneksi ke semua klien
    wss.broadcast(`Current visitors: ${numClients}`);

    // Menyambut klien yang terkoneksi
    if (ws.readyState === ws.OPEN) {
        ws.send('Welcome to my server');
    }

    // Menangani penutupan koneksi
    ws.on('close', function() {
        const numClients = wss.clients.size;  // Memperbarui jumlah klien setelah klien disconnect
        wss.broadcast(`Current Visitors: ${numClients}`);
        console.log('A Client has disconnected');
    });
});

// Fungsi broadcast untuk mengirim pesan ke semua klien
wss.broadcast = function(data) {
    wss.clients.forEach(function(client) {
        if (client.readyState === client.OPEN) {
            client.send(data); // Mengirim pesan ke klien yang terhubung
        }
    });
};
