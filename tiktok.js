 import {
    TikTokLiveConnection,
    ControlEvent,
    WebcastEvent
} from '@zerodytrash/tiktok-live-connector';
import { broadcastToClient } from './server.js';

export function connectClientToTikTok(username, clientId, clients) {

    const connection = new TikTokLiveConnection(username);

    connection.connect();

    // CONNECTED
    connection.on(ControlEvent.CONNECTED, (state) => {
        broadcastToClient(clientId, {
            event: "connected",
            data: state
        });
    });

    // DISCONNECTED
    connection.on(ControlEvent.DISCONNECTED, ({ code, reason }) => {
        broadcastToClient(clientId, {
            event: "disconnected",
            data: { code, reason }
        });
    });

    // ERROR
    connection.on(ControlEvent.ERROR, ({ info, exception }) => {
        broadcastToClient(clientId, {
            event: "error",
            data: { info, exception }
        });
    });

    // CHAT
    connection.on(WebcastEvent.CHAT, (data) => {
        broadcastToClient(clientId, {
            event: "chat",
            data
        });
    });

    // GIFT
    connection.on(WebcastEvent.GIFT, (data) => {
        broadcastToClient(clientId, {
            event: "gift",
            data
        });
    });

    // LIKE
    connection.on(WebcastEvent.LIKE, (data) => {
        broadcastToClient(clientId, {
            event: "like",
            data
        });
    });

    // MEMBER JOIN
    connection.on(WebcastEvent.MEMBER, (data) => {
        broadcastToClient(clientId, {
            event: "member",
            data
        });
    });

    // SOCIAL (share/follow)
    connection.on(WebcastEvent.SOCIAL, (data) => {
        broadcastToClient(clientId, {
            event: "social",
            data
        });
    });

    // EMOTE
    connection.on(WebcastEvent.EMOTE, (data) => {
        broadcastToClient(clientId, {
            event: "emote",
            data
        });
    });

    // ROOM USER (viewer count)
    connection.on(WebcastEvent.ROOM_USER, (data) => {
        broadcastToClient(clientId, {
            event: "roomUser",
            data
        });
    });
}
