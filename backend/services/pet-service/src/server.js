const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Pet Management & Adoption Workflow Routes
app.get('/health', (req, res) => {
  res.json({ service: 'pet-service', status: 'UP', port: PORT });
});

app.get('/', (req, res) => {
  // Query parameters: breed, age, size, gender, status, search
  res.json({
    success: true,
    total: 0,
    data: []
  });
});

app.post('/', (req, res) => {
  // Create new pet post
  res.status(201).json({
    success: true,
    message: 'Pet post created and submitted for review',
    petId: `pet-${Date.now()}`
  });
});

app.get('/:id', (req, res) => {
  res.json({
    success: true,
    pet: { id: req.params.id, name: 'Milo', status: 'WAITING' }
  });
});

app.post('/:id/apply', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Adoption application submitted successfully',
    applicationId: `app-${Date.now()}`
  });
});

app.listen(PORT, () => {
  console.log(`[Pet Service] Running on port ${PORT}`);
});
