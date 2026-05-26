const { PrismaClient } = require('@prisma/client');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const CSV_PATH = path.join(__dirname, '..', 'data', 'skincare_100.csv');

const getImageUrl = (category, id) => {
  return `/images/products/${id}.jpg`;
};

async function seed() {
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`Missing ${CSV_PATH}. Run: python scripts/preprocessing.py`);
  }

  const products = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => products.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Loading ${products.length} products from skincare_100.csv`);

  let seeded = 0;

  for (const row of products) {
    const id       = parseInt(row.id);
    const price    = parseFloat(row.Price);
    const rating   = row.Rating && row.Rating !== '' ? parseFloat(row.Rating) : null;
    const skinType = row.Skin_Type && row.Skin_Type !== '' ? row.Skin_Type.trim() : null;
    const imageUrl = getImageUrl(row.category.trim(), id);

    await prisma.product.upsert({
      where: { id },
      update: {
        name:        row.name.trim(),
        brand:       row.Brand.trim(),
        category:    row.category.trim(),
        price,
        skinType,
        rating,
        ingredients: row.Ingredients.trim(),
        imageUrl,
      },
      create: {
        id,
        name:        row.name.trim(),
        brand:       row.Brand.trim(),
        category:    row.category.trim(),
        price,
        skinType,
        rating,
        ingredients: row.Ingredients.trim(),
        imageUrl,
      },
    });

    seeded++;
    if (seeded % 20 === 0) {
      console.log(`  Seeded ${seeded}/${products.length}: ${row.name}`);
    }
  }

  console.log(`\nDone. Seeded ${seeded} products.`);
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());