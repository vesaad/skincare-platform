const mongoose = require('mongoose');

const skinAssessmentLogSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    inputs: { type: mongoose.Schema.Types.Mixed, required: true },
    routine: { type: String, required: true },
    confidence: { type: Number, required: true },
    products: { type: [mongoose.Schema.Types.Mixed], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'skinAssessmentLogs' },
);

module.exports = mongoose.model('SkinAssessmentLog', skinAssessmentLogSchema);
