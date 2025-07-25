const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint
app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log('Received location:', { latitude, longitude });
  res.sendStatus(200);
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
