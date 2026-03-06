import {useEffect,useState} from "react"
import api from "../api"
import AddTransaction from "../components/AddTransaction"

function Dashboard(){

const [transactions,setTransactions]=useState([])
const [advice,setAdvice]=useState("")

const fetchTransactions = async()=>{

const res = await api.get("/transactions",{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

setTransactions(res.data)

}

const getAdvice = async()=>{

const res = await api.get("/ai/advice",{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

setAdvice(res.data.advice)

}

useEffect(()=>{
fetchTransactions()
},[])

return(

<div>

<h1>Dashboard</h1>

<AddTransaction refresh={fetchTransactions}/>

<h2>Transactions</h2>

{transactions.map(t=>(
<div key={t._id}>
{t.title} - {t.amount}
</div>
))}

<button onClick={getAdvice}>Get AI Advice</button>

<p>{advice}</p>

</div>

)

}

export default Dashboard