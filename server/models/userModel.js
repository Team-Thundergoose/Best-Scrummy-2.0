const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Hint: Why is bcrypt required here?
 */
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  activeBoards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Board',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
  this.password = hash;
  return next();
});

module.exports = mongoose.model('User', userSchema);
