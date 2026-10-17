 const { WebcastPushConnection } = require('tiktok-live-connector');
const { broadcastToClient } = require('./utils.js');

function connectClientToTikTok(username, clientId, clients) {

    const connection = new WebcastPushConnection(username);

    connection.connect();

    connection.on('chat', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "chat",
            data: msg
        });
    });

    connection.on('gift', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "gift",
            data: msg
        });
    });

    connection.on('like', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "like",
            data: msg
        });
    });

    connection.on('member', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "member",
            data: msg
        });
    });

    connection.on('social', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "social",
            data: msg
        });
    });

    connection.on('emote', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "emote",
            data: msg
        });
    });

    connection.on('roomUser', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "roomUser",
            data: msg
        });
    });
}

module.exports = { connectClientToTikTok };
