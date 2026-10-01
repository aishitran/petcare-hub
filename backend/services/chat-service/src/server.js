const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8004;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Real-time Chat Socket Events
io.on('connection', (socket) => {
  console.log(`[Chat Socket] Client connected: ${socket.id}`);

  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
  });

  socket.on('send_message', (data) => {
    // Broadcast message to room members
    io.to(data.conversationId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`[Chat Socket] Client disconnected: ${socket.id}`);
  });
});

app.get('/health', (req, res) => {
  res.json({ service: 'chat-service', status: 'UP', port: PORT });
});

app.get('/conversations/:userId', (req, res) => {
  res.json({ success: true, data: [] });
});

server.listen(PORT, () => {
  console.log(`[Chat Service] Running on port ${PORT}`);
});
