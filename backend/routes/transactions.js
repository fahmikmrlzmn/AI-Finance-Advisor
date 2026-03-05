const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {

  const transactions = await Transaction.find({ user: req.user.id });

  res.json(transactions);

});

router.post("/", protect, async (req, res) => {

  const { text, amount } = req.body;

  const transaction = await Transaction.create({
    user: req.user.id,
    text,
    amount
  });

  res.json(transaction);

});

module.exports = router;