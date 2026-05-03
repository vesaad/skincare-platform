require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authMiddleware = require("./src/middlewares/auth.middleware");

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use(
  "/images",
  require("express").static(require("path").join(__dirname, "public/images")),
);
app.use("/api/brands", require("./src/routes/brand.routes"));
app.use("/api/ingredients", require("./src/routes/ingredient.routes"));
app.use("/api/categories", require("./src/routes/category.routes"));
app.use("/api/products", require("./src/routes/product.routes"));
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "E kalove mbrojtjen!", user: req.user });
});

app.get("/", (req, res) => {
  res.json({ message: "Skincare API po punon!" });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB u lidh me sukses"))
  .catch((err) => console.error("MongoDB gabim:", err.message));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server po dëgjon në port " + PORT);
});
