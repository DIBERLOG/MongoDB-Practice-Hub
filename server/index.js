const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoQueryRouter = require('./routes/mongoQuery');
const catalogRouter = require('./routes/catalog');
const relationsRouter = require('./routes/relations');
const adsRouter = require('./routes/ads');
const mediaRouter = require('./routes/media');
const playlistsRouter = require('./routes/playlists');
const seedDatabase = require('./utils/seedDatabase');

const app = express();
const port = Number(process.env.PORT) || 3100;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mongo_portal';
const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

app.use('/api/mongo', mongoQueryRouter);
app.use('/api', catalogRouter);
app.use('/api', relationsRouter);
app.use('/api', adsRouter);
app.use('/api', mediaRouter);
app.use('/api', playlistsRouter);

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

app.get('/health', (req, res) => {
  res.send({
    ok: true,
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get(/^(?!\/api\/).*/, (req, res) => {
  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    res.status(503).send('Фронтенд ещё не собран. Выполни npm run build.');
    return;
  }

  res.sendFile(path.join(distDir, 'index.html'));
});

async function bootstrap() {
  await mongoose.connect(mongoUri);
  await seedDatabase();

  app.listen(port, () => {
    console.log(`Mongo Portal: http://localhost:${port}`);
    console.log(`MongoDB: ${mongoUri}`);
  });
}

bootstrap().catch((error) => {
  console.error('Ошибка запуска сервера:', error);
  process.exit(1);
});
