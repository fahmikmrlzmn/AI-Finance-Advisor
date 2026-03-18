import { connectDB } from "@/utils/db"
import User from "@/models/User"

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  await connectDB()

  const { name, email, password } = req.body

  try {

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({ name, email, password })

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Register error" })
  }
}