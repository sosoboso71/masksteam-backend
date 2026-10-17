import { WebSocketServer } from 'ws';
import { connectClientToTikTok } from './tiktok.js';

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map();

export function broadcastToClient(clientId, event) {
  const ws = clients.get(clientId);
  if (!ws || ws.readyState !== ws.OPEN) return;
  ws.send(JSON.stringify(event));
}

wss.on('connection', (ws) => {
  const clientId = Date.now().toString() + Math.random().toString(16).slice(2);
  clients.set(clientId, ws);

  ws.send(JSON.stringify({ type: "clientInfo", clientId }));

  ws.on('message', (msg) => {
    let data;
    try { data = JSON.parse(msg); } catch { return; }

    if (data.type === "login" && data.username) {
      connectClientToTikTok(data.username, clientId);
    }
  });

  ws.on('close', () => clients.delete(clientId));
});
 
