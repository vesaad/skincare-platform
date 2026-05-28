const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function seed() {
  // Fshi në rradhë të saktë (foreign keys)
  await prisma.routineStep.deleteMany();
  await prisma.routine.deleteMany();
  await prisma.product.deleteMany();
  
  const csvPath = path.join(__dirname, '../ml-service/skincare_100.csv');
  const content = fs.readFileSync(csvPath, 'utf8');
  const rows = content.split('\n');
  
  let count = 0;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].trim();
    if (!row) continue;
    const cols = row.split(',');
    const id = parseInt(cols[0]);
    try {
      await prisma.product.create({
        data: {
          id:          id,
          name:        cols[2]?.trim() || 'Unknown',
          brand:       cols[3]?.trim() || 'Unknown',
          category:    cols[4]?.trim() || 'Unknown',
          price:       parseFloat(cols[5]) || 0,
          ingredients: cols[6]?.trim() || '',
          imageUrl:    `/images/products/${id}.jpg`,
        }
      });
      count++;
    } catch(e) {
      console.log('Error row', i, ':', e.message);
    }
  }
  console.log('Importuar:', count, 'produkte');
  await prisma.$disconnect();
}

seed();
