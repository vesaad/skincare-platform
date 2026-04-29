require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authMiddleware = require('./src/middlewares/auth.middleware');

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use('/api/auth', require('./src/routes/auth.routes'));

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'E kalove mbrojtjen!', user: req.user });
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