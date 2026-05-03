const authService = require("../services/auth.service");

const register = async (req, res) => {
  console.log("Register request:", req.body); // SHTO KTE
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (e) {
    console.log("Register error:", e.message); // SHTO KTE
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  console.log("Login request:", req.body);
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(400).json({ error: error.message });
  }
};
const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const me = async (req, res) => {
  res.status(200).json({ user: req.user });
};
module.exports = { register, login, refresh, logout, me };
