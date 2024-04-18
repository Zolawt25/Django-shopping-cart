import axios from 'axios'
import { useState } from 'react'
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"






const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const cookie = new Cookies()
  const navigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {email, password})
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
        <input type="password" placeholder='enter password...' onChange={(e)=> setPassword(e.target.value)}/>
        <button>login</button>
      </form>
      <a href="/register">dont have account?</a>
    </div>
  )
}

export default Login
