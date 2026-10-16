const WebSocket = require('ws');

// Server WebSocket pe portul 8080
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (socket) => {
  console.log('Overlay conectat');
  clients.add(socket);

  socket.on('close', () => {
    clients.delete(socket);
    console.log('Overlay deconectat');
  });
});

// Trimitem un mesaj de test la fiecare 5 secunde
setInterval(() => {
  const event = {
    type: 'chat',
    user: 'test_user',
    text: 'Mesaj de test din WebSocket'
  };

  const data = JSON.stringify(event);
  for (const client of clients) {
    client.send(data);
  }
}, 5000);
