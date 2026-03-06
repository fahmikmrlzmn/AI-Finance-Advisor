import {useState} from "react"
import api from "../api"

function AddTransaction({refresh}){

const [title,setTitle]=useState("")
const [amount,setAmount]=useState("")
const [type,setType]=useState("expense")

const submit = async(e)=>{

e.preventDefault()

await api.post("/transactions",{

title,
amount,
type

},{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

refresh()

}

return(

<form onSubmit={submit}>

<input placeholder="Title" onChange={e=>setTitle(e.target.value)}/>

<input placeholder="Amount" onChange={e=>setAmount(e.target.value)}/>

<select onChange={e=>setType(e.target.value)}>

<option value="expense">Expense</option>
<option value="income">Income</option>

</select>

<button>Add</button>

</form>

)

}

export default AddTransaction