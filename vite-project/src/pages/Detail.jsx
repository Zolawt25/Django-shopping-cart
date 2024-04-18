import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CartBtn from './CartBtn'








const Detail = ({setCartNum, carts}) => {
    const [product, setProduct] = useState({})
    const location = useLocation().pathname.slice(1)

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get(`http://127.0.0.1:8000/api/v1/products/${location}`)
            setProduct(res.data)
        }
        fetchData()
    },[])
    
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.disc}</p>
            <b>{product.price}</b>
            <CartBtn {...product} setCartNum={setCartNum} carts={carts}/>
        </div>
    )
}

export default Detail
