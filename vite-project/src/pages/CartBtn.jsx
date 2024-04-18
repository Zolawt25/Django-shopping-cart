import axios from 'axios'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie'






const CartBtn = ({ id, name, disc, price, setCartNum, carts }) => {
    const [err, setErr] = useState(false)
    const cookie = new Cookies()
    const token = cookie.get("user_access_token")
    const decoded = token ? jwtDecode(token) : ""

    useEffect(()=>{
        carts.forEach(item => {
            if (id === item.productId) {
                setErr(true)
            }
        })
    },)
    
    const addToCart = async()=>{
        if (!token) {
            return alert("you must login first!!!")
        }
        if (err) {
            return
        }
        try {
           await axios.post("http://127.0.0.1:8000/api/v1/cart/", {name, disc, price, productId: id, useremail: decoded.email})
        } catch (error) {
            console.log(error)
        }
        setCartNum(prev => !prev)
    }
    return (
        <div onClick={()=> addToCart()} >
            <button>
                {err ? "added":"add to cart"}
            </button>
        </div>
    )
}

export default CartBtn
