import {useState} from "react"
import api from "../api"
import {useNavigate} from "react-router-dom"

function Register(){

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const navigate = useNavigate()

const submit = async(e)=>{

e.preventDefault()

const res = await api.post("/auth/register",{
name,email,password
})

localStorage.setItem("token",res.data.token)

navigate("/dashboard")

}

return(

<form onSubmit={submit}>

<h2>Register</h2>

<input placeholder="Name" onChange={e=>setName(e.target.value)}/>

<input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>

<input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>

<button>Register</button>

</form>

)

}

export default Register