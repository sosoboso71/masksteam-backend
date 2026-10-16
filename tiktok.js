 import WebSocket from 'ws';
import { broadcastToClient } from './server.js';

export async function connectClientToTikTok(username, clientId) {
  try {
    const res = await fetch(
      `https://tiktok-chat-reader.zerody.one/api/getRoomId?username=${encodeURIComponent(username)}`
    );
    const data = await res.json();

    if (!data.roomId) {
      broadcastToClient(clientId, {
        event: "error",
        data: { message: "User not live" }
      });
      return;
    }

    const ws = new WebSocket(
      `wss://tiktok-chat-reader.zerody.one/websocket?room_id=${data.roomId}`
    );

    ws.on('message', (msg) => {
      let event;
      try { event = JSON.parse(msg); } catch { return; }

      const formatted = {
        event: event.type,
        data: event.data
      };

      broadcastToClient(clientId, formatted);
    });
  } catch (err) {
    console.error('Eroare TikTok:', err);
  }
}
