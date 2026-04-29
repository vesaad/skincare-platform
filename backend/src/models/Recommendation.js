const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId:          { type: Number, required: true },
  routineType:     { type: String, required: true },
  routineCategory: { type: String },
  confidence:      { type: Number },
  recommendedSteps:[ { type: String } ],
  inputFeatures:   { type: mongoose.Schema.Types.Mixed },
  mlModel:         { type: String, default: 'v1' },
  generatedAt:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);