const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  due_date: { type: Date, required: true },
}, {
  timestamps: true,
});

const List = mongoose.model('List', listSchema);

module.exports = List;