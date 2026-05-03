const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function clean() {
  await prisma.productIngredient.deleteMany();
  await prisma.product.deleteMany();
  console.log("U fshin të gjitha produktet!");
  await prisma.$disconnect();
}

clean().catch(console.error);
