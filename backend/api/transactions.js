import connectDB from "../utils/db";
import Transaction from "../models/Transaction";
import authMiddleware from "../middleware/authMiddleware";

connectDB();

export default async function handler(req, res) {
  if (!authMiddleware(req, res)) return;

  if (req.method === "GET") {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } else if (req.method === "POST") {
    const { text, amount } = req.body;
    const transaction = await Transaction.create({
      user: req.user.id,
      text,
      amount,
    });
    res.json(transaction);
  } else {
    res.status(405).end();
  }
}