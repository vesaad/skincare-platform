const assessmentService = require('./assessment.service');

const assess = async (req, res) => {
  try {
    const result = await assessmentService.assess(req.user.userId, req.body);
    if (!result.ok) {
      return res.status(result.status).json(result.data);
    }
    res.json(result.data);
  } catch (err) {
    console.error('Assessment error:', err.message);
    res.status(500).json({ error: err.message || 'Assessment failed' });
  }
};

module.exports = { assess };
