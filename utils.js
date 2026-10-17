function broadcastToClient(clients, clientId, event) {
    const ws = clients.get(clientId);
    if (!ws || ws.readyState !== ws.OPEN) return;
    ws.send(JSON.stringify(event));
}

module.exports = { broadcastToClient };
