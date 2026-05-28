const SkinAssessmentLog = require('../models/SkinAssessmentLog');

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000/predict';

const AGE_MAP = {
  'Under 18': 16,
  '18–24': 22,
  '18-24': 22,
  '25–34': 30,
  '25-34': 30,
  '35–44': 40,
  '35-44': 40,
  '45–54': 50,
  '45-54': 50,
  '55+': 60,
};

function toMlPayload(body) {
  let age = body.Age;
  if (typeof age === 'string') {
    age = AGE_MAP[age] ?? parseInt(age, 10);
  }

  return {
    Age: age,
    Skin_Type: body.Skin_Type,
    Skin_Tone: body.Skin_Tone,
    Climate: body.Climate,
    Diet: body.Diet,
    Hormonal_Status: body.Hormonal_Status,
    Budget_Level: body.Budget_Level,
    Acne_Severity: Number(body.Acne_Severity),
    Dryness_Severity: Number(body.Dryness_Severity),
    Pigmentation_Severity: Number(body.Pigmentation_Severity),
    Aging_Severity: Number(body.Aging_Severity),
    Sensitivity_Severity: Number(body.Sensitivity_Severity),
  };
}

const assess = async (req, res) => {
  try {
    const mlPayload = toMlPayload(req.body);

    const mlRes = await fetch(ML_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mlPayload),
    });

    const data = await mlRes.json();
    if (!mlRes.ok) {
      return res.status(mlRes.status).json({
        error: data.detail || data.error || 'ML service error',
      });
    }

    await SkinAssessmentLog.create({
      userId: req.user.userId,
      inputs: req.body,
      routine: data.routine,
      confidence: data.confidence,
      products: data.products,
    });

    res.json(data);
  } catch (err) {
    console.error('Assessment error:', err.message);
    res.status(500).json({ error: err.message || 'Assessment failed' });
  }
};

module.exports = { assess };
