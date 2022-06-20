const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

let assets;
let assetSize = 0;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});

app.get('/resources', (req, res) => {
  res.send(assets);
});

const loadAssets = () => {
  console.log('Assets loading...');

  // Calculate asset sizes
  assetSize = 0;
  let arrayOfFiles = [];
  const getAllFiles = dir => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        getAllFiles(dir + '/' + file);
      } else {
        arrayOfFiles.push(path.join(__dirname, dir, '/', file));
      }
    })
  };
  getAllFiles('./assets');
  arrayOfFiles.forEach(file => {
    assetSize += fs.statSync(file).size;
  });
  if (assetSize < 1024) console.log(`Asset Size: ${assetSize} byte`);
  else if (assetSize < 1024 * 1024) console.log(`Asset Size: ${(assetSize / 1024).toFixed(2)} kB`);
  else if (assetSize < 1024 * 1024 * 1024) console.log(`Asset Size: ${(assetSize / 1024 / 1024).toFixed(2)} MB`);

  // Set assets object
  assets = {
    shaders: {
      defaultVert: fs.readFileSync('./assets/shaders/default.vert', {encoding: 'utf-8', flag: 'r'}),
      defaultFrag: fs.readFileSync('./assets/shaders/default.frag', {encoding: 'utf-8', flag: 'r'})
    }
  };

  console.log('Assets loaded!');
}

server.listen(PORT, () => {
  // Watch assets folder for changes
  const watcher = chokidar.watch('./assets', { persistent: true });
  watcher.on('change', () => loadAssets());

  loadAssets();

  console.log(`PORT: ${PORT}`);
});
