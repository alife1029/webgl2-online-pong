const http = require('http');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});

server.listen(PORT, () => {
  console.log(`PORT: ${PORT}`);
});
