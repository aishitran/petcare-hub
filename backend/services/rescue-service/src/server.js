const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8003;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Emergency Rescue & Shelter Directory Routes
app.get('/health', (req, res) => {
  res.json({ service: 'rescue-service', status: 'UP', port: PORT });
});

// Rescue Posts (SOS)
app.get('/posts', (req, res) => {
  res.json({ success: true, total: 0, data: [] });
});

app.post('/posts/street-sos', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Rapid SOS Street rescue incident reported successfully',
    rescueId: `rescue-${Date.now()}`
  });
});

// Shelter Directory & 24/7 Hotline
app.get('/shelters', (req, res) => {
  res.json({ success: true, total: 0, data: [] });
});

// Supplies & Food Drives
app.get('/food-fund/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalSuppliesKg: 1250,
      totalSheltersSupported: 18,
      activeDrives: []
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Rescue Service] Running on port ${PORT}`);
});
