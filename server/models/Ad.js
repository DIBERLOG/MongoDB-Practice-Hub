const mongoose = require('mongoose');

const adSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    image: String,
    isMine: {
      type: Boolean,
      default: false
    },
    asNew: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'ads',
    timestamps: true
  }
);

module.exports = mongoose.models.Ad || mongoose.model('Ad', adSchema);
