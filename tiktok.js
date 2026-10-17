 import { TikTokLiveConnection, WebcastEvent } from 'tiktok-live-connector';
import { broadcastToClient } from './server.js';

export function connectClientToTikTok(username, clientId) {

    const connection = new TikTokLiveConnection(username);

    // CHAT
    connection.on(WebcastEvent.CHAT, (msg) => {
        broadcastToClient(clientId, {
            event: "chat",
            data: msg
        });
    });

    // GIFT
    connection.on(WebcastEvent.GIFT, (msg) => {
        broadcastToClient(clientId, {
            event: "gift",
            data: msg
        });
    });

    // LIKE
    connection.on(WebcastEvent.LIKE, (msg) => {
        broadcastToClient(clientId, {
            event: "like",
            data: msg
        });
    });

    // FOLLOW
    connection.on(WebcastEvent.FOLLOW, (msg) => {
        broadcastToClient(clientId, {
            event: "follow",
            data: msg
        });
    });

    // SHARE
    connection.on(WebcastEvent.SHARE, (msg) => {
        broadcastToClient(clientId, {
            event: "share",
            data: msg
        });
    });

    connection.connect();
}
