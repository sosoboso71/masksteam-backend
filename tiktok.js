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

    connection.on('follow', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "follow",
            data: msg
        });
    });

    connection.on('share', (msg) => {
        broadcastToClient(clients, clientId, {
            event: "share",
            data: msg
        });
    });
}

module.exports = { connectClientToTikTok };
