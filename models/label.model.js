const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const labelSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
});

const Label = mongoose.model('Label', labelSchema);

module.exports = Label;