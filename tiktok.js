 import { TikTokLiveConnection, WebcastEvent, ControlEvent } from 'tiktok-live-connector';
import { broadcastToClient } from './server.js';

export function connectClientToTikTok(username, clientId) {

    const connection = new TikTokLiveConnection(username);

    // Control events
    connection.on(ControlEvent.CONNECTED, () => {
        broadcastToClient(clientId, {
            event: "connected",
            data: { username }
        });
    });

    connection.on(ControlEvent.DISCONNECTED, () => {
        broadcastToClient(clientId, {
            event: "disconnected",
            data: { username }
        });
    });

    connection.on(ControlEvent.ERROR, (err) => {
        broadcastToClient(clientId, {
            event: "error",
            data: { message: err.message }
        });
    });

    // Message events (chat, gift, like, follow, share, etc.)
    connection.on(WebcastEvent.CHAT, (msg) => {
        broadcastToClient(clientId, {
            event: "chat",
            data: msg
        });
    });

    connection.on(WebcastEvent.GIFT, (msg) => {
        broadcastToClient(clientId, {
            event: "gift",
            data: msg
        });
    });

    connection.on(WebcastEvent.LIKE, (msg) => {
        broadcastToClient(clientId, {
            event: "like",
            data: msg
        });
    });

    connection.on(WebcastEvent.FOLLOW, (msg) => {
        broadcastToClient(clientId, {
            event: "follow",
            data: msg
        });
    });

    connection.on(WebcastEvent.SHARE, (msg) => {
        broadcastToClient(clientId, {
            event: "share",
            data: msg
        });
    });

    // Poți adăuga ORICE event din lista ta:
    // WebcastEvent.MEMBER
    // WebcastEvent.SOCIAL
    // WebcastEvent.EMOTE
    // WebcastEvent.ROOM_USER
    // etc.

    connection.connect();
}
