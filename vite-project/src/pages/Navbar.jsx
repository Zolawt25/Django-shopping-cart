// import jwtDecode from 'jwt-decode'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie'






const Navbar = ({carts}) => {

    const cookie = new Cookies()
    const token = cookie.get("user_access_token")
    const decoded = token ? jwtDecode(token) : "" 
    // const decode = token ? jwtDecode(token) : ""
    // console.log(decoded.name)
    const handleLogout = async()=>{
        try {
            // await axios.post("http://127.0.0.1:8000/api/auth/logout/")
            cookie.remove("user_access_token")
            cookie.remove("user_refresh_token")
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <a href="/">navbar</a>
            <form action="/search">
                <input type="search" name="search" placeholder='search....' />
            </form>
            <div>
                <a href="/cart"><button>cart({carts.length})</button></a>
                {
                    decoded ? <div><p>welcome {decoded.name}</p> <button onClick={()=>handleLogout()}>Logout</button></div>
                    : 
                    <a href="/login">login</a>
                }
            </div>
        </div>
  )
}

export default Navbar
