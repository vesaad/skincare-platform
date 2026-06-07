require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const products = await prisma.product.findMany();
  console.log('Duke rregulluar', products.length, 'produkte...');
  
  for (const p of products) {
    await prisma.product.update({
      where: { id: p.id },
      data: { imageUrl: '/images/products/' + p.id + '.jpg' }
    });
  }
  
  console.log('Mbaroi!');
  await prisma.$disconnect();
}

fix();