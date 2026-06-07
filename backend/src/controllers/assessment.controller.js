const SkinAssessmentLog = require('../models/SkinAssessmentLog');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000/predict';
const prisma = new PrismaClient();

const FALLBACK_STEPS = {
  'Acne Routine': [
    ['Cleanser', 'Salicylic Acid'],
    ['Toner', 'Ceramides'],
    ['Serum', 'Hyaluronic Acid'],
    ['Moisturizer', 'Ceramides'],
  ],
  'Hydration Routine': [
    ['Cleanser', 'Hyaluronic Acid'],
    ['Toner', 'Hyaluronic Acid'],
    ['Serum', 'Hyaluronic Acid'],
    ['Moisturizer', 'Ceramides'],
  ],
  'Brightening Routine': [
    ['Cleanser', 'Vitamin C'],
    ['Serum', 'Vitamin C'],
    ['Moisturizer', 'Vitamin C'],
    ['Sunscreen', 'Vitamin C'],
  ],
  'Anti-Aging Routine': [
    ['Cleanser', 'Retinol'],
    ['Serum', 'Retinol'],
    ['Moisturizer', 'Retinol'],
    ['Sunscreen', 'Retinol'],
  ],
  'Sensitive Skin Routine': [
    ['Cleanser', 'Ceramides'],
    ['Toner', 'Ceramides'],
    ['Moisturizer', 'Ceramides'],
    ['Sunscreen', 'Hyaluronic Acid'],
  ],
};

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

function loadProducts() {
  const csvPath = path.join(__dirname, '../../../ml-service/skincare_100.csv');
  const rows = fs.readFileSync(csvPath, 'utf8').trim().split(/\r?\n/).slice(1);

  return rows.map((row) => {
    const [id, productId, name, brand, category, price, ingredients] = row.split(',');
    return {
      product_id: Number(id || productId),
      name: name?.trim(),
      brand: brand?.trim(),
      category: category?.trim(),
      price: Number(price),
      ingredients: ingredients
        ? ingredients.split('|').map((item) => item.trim()).filter(Boolean)
        : [],
    };
  });
}

function chooseFallbackRoutine(payload) {
  const scores = [
    ['Acne Routine', payload.Acne_Severity],
    ['Hydration Routine', payload.Dryness_Severity],
    ['Brightening Routine', payload.Pigmentation_Severity],
    ['Anti-Aging Routine', payload.Aging_Severity],
    ['Sensitive Skin Routine', payload.Sensitivity_Severity],
  ];

  const [routine, score] = scores.sort((a, b) => b[1] - a[1])[0];
  if (score > 0) return routine;
  if (payload.Skin_Type === 'Sensitive') return 'Sensitive Skin Routine';
  if (payload.Skin_Type === 'Dry') return 'Hydration Routine';
  if (payload.Skin_Type === 'Oily') return 'Acne Routine';
  return 'Hydration Routine';
}

function ingredientMatches(product, targetIngredient) {
  const target = targetIngredient.toLowerCase();
  return product.ingredients.some((ingredient) =>
    ingredient.toLowerCase().includes(target),
  );
}

function buildFallbackProducts(routine) {
  const products = loadProducts();

  return FALLBACK_STEPS[routine].map(([category, ingredient]) => {
    const categoryProducts = products.filter((product) => product.category === category);
    const pool = categoryProducts.filter((product) =>
      ingredientMatches(product, ingredient),
    );
    const selected = (pool.length ? pool : categoryProducts)
      .sort((a, b) => a.price - b.price)[0];

    return { ...selected, step: category };
  }).filter(Boolean);
}

function buildFallbackAssessment(payload) {
  const routine = chooseFallbackRoutine(payload);

  return {
    routine,
    confidence: 72,
    products: buildFallbackProducts(routine),
    fallback: true,
  };
}

async function saveAssessmentForUser(userId, answers, data) {
  await prisma.skinProfile.upsert({
    where: { userId },
    update: {
      age: answers.Age,
      skinType: answers.Skin_Type,
      skinTone: answers.Skin_Tone,
      sensitivity: answers.Sensitivity_Severity,
      climate: answers.Climate,
      diet: answers.Diet,
      hormonalStatus: answers.Hormonal_Status,
    },
    create: {
      userId,
      age: answers.Age,
      skinType: answers.Skin_Type,
      skinTone: answers.Skin_Tone,
      sensitivity: answers.Sensitivity_Severity,
      climate: answers.Climate,
      diet: answers.Diet,
      hormonalStatus: answers.Hormonal_Status,
    },
  });

  await prisma.routine.updateMany({
    where: { userId, isActive: true },
    data: { isActive: false },
  });

  return prisma.routine.create({
    data: {
      userId,
      type: data.routine,
      name: data.routine,
      isActive: true,
      routineSteps: {
        create: data.products.map((product, index) => ({
          productId: product.product_id,
          stepOrder: index + 1,
          timeOfDay: 'Daily',
          instructions: product.step || product.category || null,
        })),
      },
    },
    include: {
      routineSteps: {
        include: { product: true },
        orderBy: { stepOrder: 'asc' },
      },
    },
  });
}

const assess = async (req, res) => {
  try {
    const mlPayload = toMlPayload(req.body);
    let data;

    try {
      const mlRes = await fetch(ML_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mlPayload),
      });

      data = await mlRes.json();
      if (!mlRes.ok) {
        return res.status(mlRes.status).json({
          error: data.detail || data.error || 'ML service error',
        });
      }
    } catch (err) {
      console.warn('ML service unavailable, using fallback assessment:', err.message);
      data = buildFallbackAssessment(mlPayload);
    }

    const savedRoutine = await saveAssessmentForUser(
      req.user.userId,
      mlPayload,
      data,
    );

    try {
      await SkinAssessmentLog.create({
        userId: req.user.userId,
        inputs: req.body,
        routine: data.routine,
        confidence: data.confidence,
        products: data.products,
      });
    } catch (err) {
      console.warn('Assessment log skipped:', err.message);
    }

    res.json({
      ...data,
      routineId: savedRoutine.id,
      savedRoutine,
    });
  } catch (err) {
    console.error('Assessment error:', err.message);
    res.status(500).json({ error: err.message || 'Assessment failed' });
  }
};

module.exports = { assess };
