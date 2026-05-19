const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  // Shto Brands
  await prisma.brand.createMany({
    data: [
      { name: "LuxuryGlow",   country: "USA" },
      { name: "DermaCare",    country: "USA" },
      { name: "ClinicalSkin", country: "USA" },
      { name: "InfluenceX",   country: "USA" },
      { name: "BudgetBeauty", country: "USA" },
      { name: "NaturalBliss", country: "USA" },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Brands u shtuan!");

  await prisma.productCategory.createMany({
    data: [
      { name: "Moisturizer", description: "Hydrating moisturizers" },
      { name: "Serum",       description: "Concentrated treatment serums" },
      { name: "Cleanser",    description: "Face cleansers" },
      { name: "Toner",       description: "Balancing toners" },
      { name: "Sunscreen",   description: "Sun protection" },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Categories u shtuan!");

  await prisma.$disconnect();
}

seed().catch(console.error);