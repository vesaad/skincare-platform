const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();

async function seed() {
  // 1. Shto Brands
  const brandNames = [
    "LuxuryGlow",
    "DermaCare",
    "ClinicalSkin",
    "InfluenceX",
    "BudgetBeauty",
  ];
  for (const name of brandNames) {
    const exists = await prisma.brand.findFirst({ where: { name } });
    if (!exists) {
      await prisma.brand.create({
        data: { name, country: "USA", description: name + " skincare brand" },
      });
    }
  }
  console.log("✅ Brands u shtuan");

  // 2. Shto Categories
  const categoryNames = [
    "Cleanser",
    "Serum",
    "Moisturizer",
    "Sunscreen",
    "Toner",
    "Eye Cream",
  ];
  for (const name of categoryNames) {
    const exists = await prisma.productCategory.findFirst({ where: { name } });
    if (!exists) {
      await prisma.productCategory.create({
        data: { name, description: name + " products" },
      });
    }
  }
  console.log("✅ Categories u shtuan");

  // 3. Shto Ingredients
  const ingredientList = [
    { name: "Retinol", safetyRating: 4 },
    { name: "Hyaluronic_Acid", safetyRating: 5 },
    { name: "Ceramides", safetyRating: 5 },
    { name: "Salicylic_Acid", safetyRating: 4 },
    { name: "Vitamin_C", safetyRating: 5 },
  ];
  for (const ing of ingredientList) {
    const exists = await prisma.ingredient.findFirst({
      where: { name: ing.name },
    });
    if (!exists) {
      await prisma.ingredient.create({
        data: {
          name: ing.name,
          safetyRating: ing.safetyRating,
          description: ing.name,
        },
      });
    }
  }
  console.log("✅ Ingredients u shtuan");

  // 4. Importo produktet nga CSV
  const brands = await prisma.brand.findMany();
  const ingredients = await prisma.ingredient.findMany();
  const category = await prisma.productCategory.findFirst();

  const csv = fs.readFileSync("products.csv", "utf8");
  const lines = csv.trim().split("\n").slice(1);

  let count = 0;
  for (const line of lines) {
    const parts = line.split(",");
    const id = parts[0];
    const brandName = parts[1];
    const price = parts[2];
    const ingredientStr = parts.slice(3).join(",");

    const brand = brands.find((b) => b.name === brandName);
    if (!brand) continue;

    const product = await prisma.product.create({
      data: {
        name: "Product " + id,
        brandId: brand.id,
        categoryId: category.id,
        price: parseFloat(price),
        imageUrl: "product_" + id + ".jpg",
      },
    });

    const ingNames = ingredientStr.trim().split("|");
    for (const ingName of ingNames) {
      const ing = ingredients.find((i) => i.name === ingName.trim());
      if (ing) {
        await prisma.productIngredient.create({
          data: { productId: product.id, ingredientId: ing.id },
        });
      }
    }
    count++;
  }
  console.log("✅ Done! " + count + " produkte u importuan!");
  await prisma.$disconnect();
}

seed().catch(console.error);
