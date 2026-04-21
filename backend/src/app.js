require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Test route - kontrollo që serveri punon
app.get('/', (req, res) => {
  res.json({ message: 'Skincare API po punon!' });
});

module.exports = app;