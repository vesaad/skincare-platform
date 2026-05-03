const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();

async function seed() {
  const brands = await prisma.brand.findMany();
  const ingredients = await prisma.ingredient.findMany();

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

    const ingList = ingredientStr.trim().split("|");
    let categoryName = "Moisturizer";
    if (ingList.includes("Retinol")) categoryName = "Serum";
    else if (ingList.includes("Salicylic_Acid")) categoryName = "Cleanser";
    else if (ingList.includes("Vitamin_C")) categoryName = "Serum";
    else if (ingList.includes("Hyaluronic_Acid")) categoryName = "Moisturizer";
    else if (ingList.includes("Ceramides")) categoryName = "Moisturizer";

    const cat = await prisma.productCategory.findFirst({
      where: { name: categoryName },
    });

    const product = await prisma.product.create({
      data: {
        name: "Product " + id,
        brandId: brand.id,
        categoryId: cat.id,
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
