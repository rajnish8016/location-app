const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to receive location
app.post('/location', (req, res) => {
  const { mapLink } = req.body;
  console.log('Received Google Maps link:', mapLink);
  res.status(200).send('Location link received');
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
