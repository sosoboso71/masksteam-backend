 const { WebcastPushConnection } = require('tiktok-live-connector');
const { broadcastToClient } = require('./server.js');

function connectClientToTikTok(username, clientId) {

    const connection = new WebcastPushConnection(username);

    connection.connect();

    // CHAT
    connection.on('chat', (msg) => {
        broadcastToClient(clientId, {
            event: "chat",
            data: msg
        });
    });

    // GIFT
    connection.on('gift', (msg) => {
        broadcastToClient(clientId, {
            event: "gift",
            data: msg
        });
    });

    // LIKE
    connection.on('like', (msg) => {
        broadcastToClient(clientId, {
            event: "like",
            data: msg
        });
    });

    // FOLLOW
    connection.on('follow', (msg) => {
        broadcastToClient(clientId, {
            event: "follow",
            data: msg
        });
    });

    // SHARE
    connection.on('share', (msg) => {
        broadcastToClient(clientId, {
            event: "share",
            data: msg
        });
    });

    // POȚI ADAUGA ORICE EVENT DIN LISTA ZERODY:
    // connection.on('member', ...)
    // connection.on('social', ...)
    // connection.on('emote', ...)
    // connection.on('roomUser', ...)
}

module.exports = { connectClientToTikTok };
