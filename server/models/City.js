const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    name: String,
    population: Number,
    country: String
  },
  {
    collection: 'cities'
  }
);

module.exports = mongoose.models.City || mongoose.model('City', citySchema);
