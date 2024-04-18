import axios from 'axios'
import { useState } from 'react'
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"






const Register = () => {

  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [name, setName] = useState('')
  const [sex, setSex] = useState('')
  const cookie = new Cookies()
  const navigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      if(password1 !== password2){
        return alert("password not correct!!!")
      }
      const res = await axios.post("http://127.0.0.1:8000/api/auth/registration/", {email, password1, password2, sex, name})
      console.log(res.data)
      cookie.set("user_access_token", res.data.access_token)
      cookie.set("user_refresh_token", res.data.refresh_token)
      navigate("/")
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={(e)=> submitHandler(e)}>
        <input type="email" placeholder='enter email...' onChange={(e)=> setEmail(e.target.value)}/>
        <input type="text" placeholder='enter name...' onChange={(e)=> setName(e.target.value)}/>
        <input type="text" placeholder='enter sex...' onChange={(e)=> setSex(e.target.value)}/>
        <input type="password" placeholder='enter password...' onChange={(e)=> setPassword1(e.target.value)}/>
        <input type="password" placeholder='confurm password...' onChange={(e)=> setPassword2(e.target.value)}/>
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
