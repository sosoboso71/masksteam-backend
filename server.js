 const WebSocket = require('ws');
const { connectClientToTikTok } = require('./tiktok.js');
const { broadcastToClient } = require('./utils.js');

const PORT = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: PORT });

const clients = new Map();

wss.on('connection', (ws) => {
    const clientId = Date.now().toString() + Math.random().toString(16).slice(2);
    clients.set(clientId, ws);

    ws.send(JSON.stringify({ type: "clientInfo", clientId }));

    ws.on('message', (msg) => {
        let data;
        try { data = JSON.parse(msg); } catch { return; }

        if (data.type === "login") {
            connectClientToTikTok(data.username, clientId, clients);
        }
    });

    ws.on('close', () => clients.delete(clientId));
});
