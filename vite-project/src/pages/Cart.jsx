import axios from 'axios'
import React, { useEffect, useState } from 'react'







const Cart = ({carts, setRemove}) => {
    // console.log(cart)
    // const [carts, setCarts] = useState([])
    // const [removed, setRemoved] = useState(false)
    
    // useEffect(()=>{
    //     const fetchData = async()=>{
    //         const res = await axios.get("http://127.0.0.1:8000/api/v1/cart/")
    //         setCarts(res.data)
            
    //     }
    //     fetchData()
    // },[removed])
    // setFilterdCarts(carts)
    const removeCart = async(id)=>{
        try {
           await axios.delete(`http://127.0.0.1:8000/api/v1/cart/${id}`) 
        } catch (error) {
           console.log(error) 
        }
        // setCartNum(prev => !prev)
        setRemove(prev => !prev)
    }
    return (
        <div>
            {
                carts.map((item, index)=>{
                    return <div key={index}>
                        <a href={`/${item.id}`} style={{textDecoration: "none", color: "black"}}>
                            <h1>{item.name}</h1>
                            <p>{item.disc}</p>
                            <b>{item.price}</b>
                        </a>
                        <button onClick={()=> removeCart(item.id)}>remove</button>
                    </div>
                })
            }
            {carts.length < 1 && <h1>you have 0 carts</h1>}
        </div>
    )
}

export default Cart
