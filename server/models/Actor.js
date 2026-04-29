const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema(
  {
    name: String,
    sex: String,
    age: Number,
    eyes: String,
    hair: String,
    height: Number,
    rating: Number
  },
  {
    collection: 'actors'
  }
);

module.exports = mongoose.models.Actor || mongoose.model('Actor', actorSchema);
