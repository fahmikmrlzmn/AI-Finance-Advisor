const express = require("express")
const router = express.Router()

const Transaction = require("../models/Transaction")
const protect = require("../middleware/authMiddleware")

const Groq = require("groq-sdk")

const groq = new Groq({
  apiKey:process.env.GROQ_API_KEY
})

router.get("/advice",protect,async(req,res)=>{

  try{

    const transactions = await Transaction.find({user:req.user.id})

    if(transactions.length===0)
      return res.json({advice:"No transactions yet"})

    const summary = transactions
      .map(t=>`${t.text}: $${t.amount}`)
      .join("\n")

    const prompt = `
Analyze this spending:

${summary}

Give financial advice.
`

    const completion = await groq.chat.completions.create({

      messages:[{role:"user",content:prompt}],

      model:"llama-3.1-8b-instant",

    })

    res.json({
      advice:completion.choices[0].message.content
    })

  }catch(err){

    console.log(err)

    res.status(500).json({message:"AI error"})

  }

})

module.exports = router