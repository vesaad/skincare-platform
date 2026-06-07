require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs   = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function seed() {
  console.log('Duke filluar seed...');
  const csv = fs.readFileSync(path.join(__dirname, '../../../ml-service/skincare_100.csv'), 'utf8');
  const lines = csv.trim().split('\n').slice(1, 101);

  const brands      = await prisma.brand.findMany();
  const ingredients = await prisma.ingredient.findMany();
  const categories  = await prisma.productCategory.findMany();

  let success = 0, skipped = 0;

  for (const line of lines) {
    const [id, productId, productName, brandName, catName, price, ingredientStr] = line.split(',');
    const brand    = brands.find(b => b.name === brandName?.trim());
    const category = categories.find(c => c.name === catName?.trim());

    if (!brand || !category) { skipped++; continue; }

    const imageUrl = `/images/products/${id}.jpg`;
    const productData = {
      id:          parseInt(id),
      name:        productName.trim(),
      brand:       brandName.trim(),
      category:    catName.trim(),
      price:       parseFloat(price),
      ingredients: ingredientStr.trim(),
      imageUrl:    imageUrl,
    };
    const product = await prisma.product.upsert({
      where: { id: productData.id },
      update: productData,
      create: productData,
    });

    await prisma.productIngredient.deleteMany({
      where: { productId: product.id }
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
    console.log(`Produkt ${success}/100: ${product.name} (${productId})`);
  }

  console.log(`\nSeed mbaroi! ${success} produkte, ${skipped} skip`);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
