import { connectDB } from "@/utils/db"
import Transaction from "@/models/Transaction"
import jwt from "jsonwebtoken"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

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

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {

    const transactions = await Transaction.find({ user: user.id })

    if (transactions.length === 0) {
      return res.json({ advice: "No transactions yet" })
    }

    const summary = transactions
      .map(t => `${t.text}: $${t.amount}`)
      .join("\n")

    const prompt = `
Analyze this spending:

${summary}

Give financial advice.
`

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant"
    })

    res.json({
      advice: completion.choices[0].message.content
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "AI error" })
  }
}