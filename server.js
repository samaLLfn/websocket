const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

let clients = []; // Track connected clients

wss.on('connection', (ws) => {
  clients.push(ws); // Add new client to clients list
  console.log('New connection established');

  // When a message is received, broadcast it to all connected clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message); // Broadcast message to all other clients
      }
    });
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log('Connection closed');
    clients = clients.filter(client => client !== ws); // Remove client from list
  });
});

console.log('WebSocket server running...');
