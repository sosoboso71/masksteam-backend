 const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const { connectClientToTikTok } = require('./tiktok');

// Mapă: clientId -> socket
const clients = new Map();

// Trimite evenimente DOAR către clientul corect
function broadcastToClient(clientId, data) {
    const ws = clients.get(clientId);
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify(data));
}

wss.on('connection', (ws) => {
    // Generăm un ID unic pentru client
    const clientId = Date.now().toString() + Math.random().toString(16).slice(2);
    clients.set(clientId, ws);

    console.log("Client conectat:", clientId);

    // Trimitem clientId către frontend
    ws.send(JSON.stringify({ type: 'clientId', clientId }));

    ws.on('message', (msg) => {
        const data = JSON.parse(msg);

        // Clientul trimite username-ul lui TikTok
        if (data.type === 'login' && data.username) {
            console.log(`Client ${clientId} se conectează la TikTok LIVE ca ${data.username}`);
            connectClientToTikTok(data.username, clientId);
        }
    });

    ws.on('close', () => {
        clients.delete(clientId);
        console.log("Client deconectat:", clientId);
    });
});

module.exports = { broadcastToClient };
