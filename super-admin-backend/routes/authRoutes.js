const express = require("express");
const { register, login } = require("../controllers/authControllers");
const router = express.Router();

router.post(
  "/register",
  (req, res, next) => {
    console.log("✅ Register route hit:", req.body);
    next();
  },
  register
);

router.post("/login", login);

module.exports = router;
