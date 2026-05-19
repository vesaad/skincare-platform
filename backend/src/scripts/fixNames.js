require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProductName = (brand, ingredients) => {
  const parts = ingredients.split('|').map(i => i.replace(/_/g, ' '));
  const main = parts[0];
  
  const nameMap = {
    'Retinol':       'Retinol Night Serum',
    'Hyaluronic Acid': 'Hyaluronic Acid Moisturizer',
    'Salicylic Acid':  'Salicylic Acid Cleanser',
    'Vitamin C':       'Vitamin C Brightening Serum',
    'Ceramides':       'Ceramide Repair Cream',
  };

  const productType = nameMap[main] || `${main} Treatment`;
  return `${brand} ${productType}`;
};

async function fixNames() {
  const products = await prisma.product.findMany({
    include: { brand: true, productIngredients: { include: { ingredient: true } } }
  });

  for (const p of products) {
    const ingredientStr = p.productIngredients.map(pi => pi.ingredient.name).join('|');
    const newName = getProductName(p.brand.name, ingredientStr);
    await prisma.product.update({
      where: { id: p.id },
      data: { name: newName }
    });
    console.log(`✓ ${p.id}: ${newName}`);
  }

  console.log('Emrat u ndryshuan!');
}

fixNames().catch(console.error).finally(() => prisma.$disconnect());