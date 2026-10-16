const WebSocket = require('ws');
const fetch = require('node-fetch');
const { broadcastToClient } = require('./server');

async function connectClientToTikTok(username, clientId) {
    // 1. Obținem ROOM_ID de la Zerody
    const res = await fetch(`https://tiktok-chat-reader.zerody.one/api/getRoomId?username=${username}`);
    const data = await res.json();

    if (!data.roomId) {
        console.log("Nu am găsit ROOM_ID pentru", username);
        return;
    }

    const ROOM_ID = data.roomId;

    // 2. Conectăm clientul la TikTok LIVE
    const ws = new WebSocket(`wss://tiktok-chat-reader.zerody.one/websocket?room_id=${ROOM_ID}`);

    ws.on('open', () => {
        console.log(`Client ${clientId} conectat la TikTok LIVE (${username})`);
    });

    ws.on('message', (msg) => {
        const event = JSON.parse(msg);

        // 3. Trimitem evenimentul DOAR către overlay-ul acestui client
        broadcastToClient(clientId, event);
    });

    ws.on('close', () => {
        console.log(`Conexiune închisă pentru client ${clientId}`);
    });

    ws.on('error', (err) => {
        console.error(`Eroare pentru client ${clientId}:`, err);
    });
}

module.exports = { connectClientToTikTok };
