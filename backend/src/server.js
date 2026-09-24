require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authMiddleware = require("./middleware/auth.middleware.js");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://localhost:5177",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", require("./features/admin/admin.routes.js"));
app.use("/api/auth", require("./features/auth/auth.routes.js"));

app.use(
  "/images",
  express.static(
    path.join(__dirname, "../../frontend/public/images")
  )
);

app.use("/api/brands", require("./features/brands/brand.routes.js"));
app.use(
  "/api/ingredients",
  require("./features/ingredients/ingredient.routes.js")
);
app.use(
  "/api/categories",
  require("./features/categories/category.routes.js")
);
app.use(
  "/api/products",
  require("./features/products/product.routes.js")
);
app.use(
  "/api/assessment",
  require("./features/assessment/assessment.routes.js")
);
app.use(
  "/api/routines",
  require("./features/routines/routine.routes.js")
);
app.use(
  "/api/progress-logs",
  require("./features/progress/progress.routes.js")
);

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "E kalove mbrojtjen!",
    user: req.user,
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Skincare API po punon!",
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB u lidh me sukses");
  })
  .catch((err) => {
    console.error("MongoDB gabim:", err.message);
  });

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server po dëgjon në port " + PORT);
});