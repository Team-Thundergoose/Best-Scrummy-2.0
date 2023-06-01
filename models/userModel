const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  activeBoards: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  },
});
//an array of this type??
// activeBoards: [{ type : ObjectId, ref: 'Board' }],

mongoose.model.exports = mongoose.model('User', userSchema);
