const fs = require('fs');
const path = require('path');
const { EJSON } = require('bson');
const Actor = require('../models/Actor');
const City = require('../models/City');
const CatalogProduct = require('../models/CatalogProduct');
const RelationProduct = require('../models/RelationProduct');
const User = require('../models/User');
const Order = require('../models/Order');
const Ad = require('../models/Ad');
const Video = require('../models/Video');
const Blogger = require('../models/Blogger');
const Playlist = require('../models/Playlist');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DEFAULT_AD_IMAGE = 'https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg';

function readEjsonArray(filename) {
  let filePath = path.join(DATA_DIR, filename);
  let source = fs.readFileSync(filePath, 'utf8');
  let parsed = EJSON.parse(source);

  return parsed.map((item) => {
    let next = { ...item };
    delete next._id;
    return next;
  });
}

function buildVideosWithExtras() {
  let videos = readEjsonArray('videos.json');

  let playlistMap = {
    'HRКотик': 'Карьера',
    'Обезьянка-Путешественница': 'Путешествия',
    'Js и Рамен': 'Frontend',
    'Сисадмин': 'Инфраструктура'
  };

  let youtubeByTitle = new Map([
    ['Как найти свою первую работу', '<iframe src="https://www.youtube.com/embed/TX9qSaGXFyg" title="Работа в IT" frameborder="0" allowfullscreen></iframe>'],
    ['Топ 10 бесплатных ресурсов для изучения JS', '<iframe src="https://www.youtube.com/embed/PkZNo7MFNFg" title="Изучение JavaScript" frameborder="0" allowfullscreen></iframe>'],
    ['Каждый месяц живу в новом городе', '<iframe src="https://www.youtube.com/embed/scxs7L0vhZ4" title="Путешествия" frameborder="0" allowfullscreen></iframe>']
  ]);

  return videos.map((video) => ({
    ...video,
    playlist: playlistMap[video.author] || '',
    youtube: youtubeByTitle.get(video.title) || ''
  }));
}

function buildPlaylists(videos) {
  let seen = new Set();
  let playlists = [];

  for (let video of videos) {
    if (!video.playlist) {
      continue;
    }

    let key = `${video.author}::${video.playlist}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    playlists.push({
      title: video.playlist,
      author: video.author
    });
  }

  return playlists;
}

async function seedCollection(Model, docs) {
  let count = await Model.countDocuments();
  if (count === 0) {
    await Model.insertMany(docs);
  }
}

async function seedDatabase() {
  let videos = buildVideosWithExtras();

  await seedCollection(Actor, readEjsonArray('actors.json'));
  await seedCollection(City, readEjsonArray('cities.json'));
  await seedCollection(CatalogProduct, readEjsonArray('catalog_products.json'));
  await seedCollection(RelationProduct, readEjsonArray('relation_products.json'));
  await seedCollection(User, readEjsonArray('users.json'));
  await seedCollection(Order, readEjsonArray('orders.json'));
  await seedCollection(
    Ad,
    readEjsonArray('ads.json').map((item, index) => ({
      ...item,
      image: item.image || DEFAULT_AD_IMAGE,
      asNew: Boolean(index % 2),
      isMine: item.isMine !== undefined ? item.isMine : index % 3 === 0
    }))
  );
  await seedCollection(Video, videos);
  await seedCollection(Blogger, readEjsonArray('bloggers.json'));
  await seedCollection(Playlist, buildPlaylists(videos));
}

module.exports = seedDatabase;
