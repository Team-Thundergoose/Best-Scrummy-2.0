const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  state: [],
  name: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
});

module.exports = mongoose.model('Board', boardSchema);
