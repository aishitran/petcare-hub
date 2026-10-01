const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Auth & User Routes Mock/Starter
app.get('/health', (req, res) => {
  res.json({ service: 'auth-service', status: 'UP', port: PORT });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: Validate credentials against Database (PostgreSQL / Mongo)
  res.json({
    success: true,
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: 'user-01',
      name: 'Nguyen Van A',
      email: email || 'user@example.com',
      role: 'USER'
    }
  });
});

app.post('/register', (req, res) => {
  const { name, email, phone } = req.body;
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: { id: `user-${Date.now()}`, name, email, phone, role: 'USER' }
  });
});

app.get('/me', (req, res) => {
  res.json({
    id: 'user-01',
    name: 'Nguyen Van A',
    email: 'user@example.com',
    role: 'USER',
    phone: '0988 123 456'
  });
});

app.listen(PORT, () => {
  console.log(`[Auth Service] Running on port ${PORT}`);
});
