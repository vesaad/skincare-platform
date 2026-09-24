const SkinAssessmentLog = require('./skin-assessment-log.model');

const create = (data) => SkinAssessmentLog.create(data);

module.exports = { create };
