import { connectDB } from "@/utils/db"
import Transaction from "@/models/Transaction"
import jwt from "jsonwebtoken"

function getUser(req) {
  const authHeader = req.headers.authorization

  if (!authHeader) return null

  const token = authHeader.split(" ")[1]

  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export default async function handler(req, res) {

  await connectDB()

  const user = getUser(req)

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  if (req.method === "GET") {

    const transactions = await Transaction.find({ user: user.id })
    return res.json(transactions)

  }

  if (req.method === "POST") {

    const { text, amount } = req.body

    const transaction = await Transaction.create({
      user: user.id,
      text,
      amount
    })

    return res.json(transaction)
  }

  res.status(405).json({ message: "Method not allowed" })
}