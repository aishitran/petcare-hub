const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Security & Logging Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));

// Microservices Routing Table
const SERVICES = {
  AUTH: process.env.AUTH_SERVICE_URL || 'http://localhost:8001',
  PETS: process.env.PET_SERVICE_URL || 'http://localhost:8002',
  RESCUE: process.env.RESCUE_SERVICE_URL || 'http://localhost:8003',
  CHAT: process.env.CHAT_SERVICE_URL || 'http://localhost:8004',
};

// Healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'PetCare Hub API Gateway',
    timestamp: new Date().toISOString(),
    routes: {
      auth: '/api/v1/auth -> ' + SERVICES.AUTH,
      pets: '/api/v1/pets -> ' + SERVICES.PETS,
      applications: '/api/v1/applications -> ' + SERVICES.PETS,
      rescues: '/api/v1/rescues -> ' + SERVICES.RESCUE,
      shelters: '/api/v1/shelters -> ' + SERVICES.RESCUE,
      chat: '/api/v1/chat -> ' + SERVICES.CHAT,
    }
  });
});

// Proxy Rules
app.use('/api/v1/auth', createProxyMiddleware({ target: SERVICES.AUTH, changeOrigin: true }));
app.use('/api/v1/users', createProxyMiddleware({ target: SERVICES.AUTH, changeOrigin: true }));
app.use('/api/v1/pets', createProxyMiddleware({ target: SERVICES.PETS, changeOrigin: true }));
app.use('/api/v1/applications', createProxyMiddleware({ target: SERVICES.PETS, changeOrigin: true }));
app.use('/api/v1/appointments', createProxyMiddleware({ target: SERVICES.PETS, changeOrigin: true }));
app.use('/api/v1/rescues', createProxyMiddleware({ target: SERVICES.RESCUE, changeOrigin: true }));
app.use('/api/v1/shelters', createProxyMiddleware({ target: SERVICES.RESCUE, changeOrigin: true }));
app.use('/api/v1/donations', createProxyMiddleware({ target: SERVICES.RESCUE, changeOrigin: true }));
app.use('/api/v1/chat', createProxyMiddleware({ target: SERVICES.CHAT, changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`[API Gateway] PetCare Hub Gateway running on port ${PORT}`);
});
