require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs   = require('fs');
const https = require('https');
const path = require('path');
const prisma = new PrismaClient();

const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const IMAGE_DIR = path.join(__dirname, '../../public/images');

const getProductName = (brand, ingredients) => {
  const main = ingredients.split('|')[0].replace(/_/g, ' ');
  return `${brand} ${main} Formula`;
};

const getRoutineStep = (ingredients) => {
  if (ingredients.includes('Retinol'))    return 'Night';
  if (ingredients.includes('Salicylic'))  return 'Morning';
  if (ingredients.includes('Vitamin_C'))  return 'Morning';
  if (ingredients.includes('Hyaluronic')) return 'Morning/Night';
  if (ingredients.includes('Ceramides'))  return 'Morning/Night';
  return 'Morning/Night';
};

const getDescription = (ingredients) => {
  const names = ingredients.split('|').map(i => i.replace(/_/g, ' ')).join(', ');
  return `Formula me ${names} per kujdes te lekures.`;
};

const getCategoryName = (ingredients) => {
  if (ingredients.includes('Salicylic'))  return 'Cleanser';
  if (ingredients.includes('Retinol'))    return 'Serum';
  if (ingredients.includes('Vitamin_C'))  return 'Serum';
  if (ingredients.includes('Hyaluronic')) return 'Moisturizer';
  if (ingredients.includes('Ceramides'))  return 'Moisturizer';
  return 'Serum';
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
};

const getImageUrl = async (category, productId) => {
  try {
    if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
    const localPath = path.join(IMAGE_DIR, `product_${productId}.jpg`);
    const publicUrl = `/images/product_${productId}.jpg`;
    if (fs.existsSync(localPath)) return publicUrl;
    const query = `${category} skincare product`;
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=squarish`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    const data = await res.json();
    if (data.urls?.small) {
      await downloadImage(data.urls.small, localPath);
      return publicUrl;
    }
    return null;
  } catch { return null; }
};

async function seed() {
  console.log('Duke filluar seed...');
  const csv = fs.readFileSync(path.join(__dirname, '../../products.csv'), 'utf8');
  const lines = csv.trim().split('\n').slice(1, 101);

  const brands      = await prisma.brand.findMany();
  const ingredients = await prisma.ingredient.findMany();
  const categories  = await prisma.productCategory.findMany();

  let success = 0, skipped = 0;

  for (const line of lines) {
    const [id, brandName, price, ingredientStr] = line.split(',');
    const brand    = brands.find(b => b.name === brandName?.trim());
    const catName  = getCategoryName(ingredientStr?.trim());
    const category = categories.find(c => c.name === catName);

    if (!brand || !category) { skipped++; continue; }

    const imageUrl = await getImageUrl(catName, id);
    const product = await prisma.product.create({
      data: {
        name:        getProductName(brandName.trim(), ingredientStr.trim()),
        brandId:     brand.id,
        categoryId:  category.id,
        price:       parseFloat(price),
        routineStep: getRoutineStep(ingredientStr.trim()),
        description: getDescription(ingredientStr.trim()),
        imageUrl,
      }
    });

    const ingNames = ingredientStr.trim().split('|');
    for (const ingName of ingNames) {
      const ing = ingredients.find(i => i.name === ingName.trim());
      if (ing) {
        await prisma.productIngredient.create({
          data: { productId: product.id, ingredientId: ing.id }
        });
      }
    }

    success++;
    console.log(`Produkt ${success}/100: ${product.name}`);
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nSeed mbaroi! ${success} produkte, ${skipped} skip`);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
