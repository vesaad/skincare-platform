require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const https = require('https');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

const IMAGE_DIR = path.join(__dirname, '../../public/images');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
};

async function fix() {
  const products = await prisma.product.findMany({ where: { imageUrl: null } });
  console.log('Duke plotesuar', products.length, 'produkte...');
  for (const p of products) {
    try {
      const res = await fetch(
        'https://api.unsplash.com/photos/random?query=skincare+product&orientation=squarish',
        { headers: { Authorization: 'Client-ID ' + process.env.UNSPLASH_KEY } }
      );
      const data = await res.json();
      if (data.urls && data.urls.small) {
        if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
        const localPath = path.join(IMAGE_DIR, 'product_' + p.id + '.jpg');
        await downloadImage(data.urls.small, localPath);
        await prisma.product.update({
          where: { id: p.id },
          data: { imageUrl: '/images/product_' + p.id + '.jpg' }
        });
        console.log('U plotesua:', p.id);
      }
      await new Promise(r => setTimeout(r, 200));
    } catch(e) { console.log('Gabim:', p.id, e.message); }
  }
  console.log('Mbaroi!');
  await prisma.$disconnect();
}
fix();
