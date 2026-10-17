 const WebSocket = require('ws');
const { connectClientToTikTok } = require('./tiktok.js');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

const clients = new Map();

function broadcastToClient(clientId, event) {
    const ws = clients.get(clientId);
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify(event));
}

wss.on('connection', (ws) => {
    const clientId = Date.now().toString() + Math.random().toString(16).slice(2);
    clients.set(clientId, ws);

    ws.send(JSON.stringify({ type: "clientInfo", clientId }));

    ws.on('message', (msg) => {
        let data;
        try { data = JSON.parse(msg); } catch { return; }

        if (data.type === "login") {
            connectClientToTikTok(data.username, clientId);
        }
    });

    ws.on('close', () => clients.delete(clientId));
});

module.exports = { broadcastToClient };
