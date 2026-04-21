const mongoose = require('mongoose');

const progressNoteSchema = new mongoose.Schema({
  userId:    { type: Number, required: true },
  routineId: { type: Number },
  rating:    { type: Number, min: 1, max: 5 },
  freeText:  { type: String },
  tags:      [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressNote', progressNoteSchema);