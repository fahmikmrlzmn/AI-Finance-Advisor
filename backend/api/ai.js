import connectDB from "../utils/db";
import Transaction from "../models/Transaction";
import authMiddleware from "../middleware/authMiddleware";
import Groq from "groq-sdk";

connectDB();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (!authMiddleware(req, res)) return;

  if (req.method !== "GET") return res.status(405).end();

  try {
    const transactions = await Transaction.find({ user: req.user.id });
    if (transactions.length === 0) return res.json({ advice: "No transactions yet" });

    const summary = transactions.map(t => `${t.text}: $${t.amount}`).join("\n");

    const prompt = `Analyze this spending:\n${summary}\nGive financial advice.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
    });

    res.json({ advice: completion.choices[0].message.content });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "AI error" });
  }
}