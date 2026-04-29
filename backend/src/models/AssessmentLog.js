const mongoose = require('mongoose');

const assessmentLogSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  inputs: {
    age:         Number,
    skinType:    String,
    hydration:   Number,
    oilLevel:    Number,
    sensitivity: Number,
    sleepHours:  Number,
    waterIntake: Number,
    climate:     String,
    budget:      String,
    concerns:    [String]
  },
  prediction: { type: String },
  confidence: { type: Number },
  assessedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AssessmentLog', assessmentLogSchema);