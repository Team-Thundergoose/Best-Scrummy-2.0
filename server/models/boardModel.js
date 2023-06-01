const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema ({
  state: {
    type: [],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  participants: {
    type: [String],
    required: true
  }

})

mongoose.model.exports = mongoose.model("Board", boardSchema)