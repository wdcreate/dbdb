const mongoose = require('mongoose');

const StatesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    //unique: true
  },
  zip: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('States', StatesSchema);
