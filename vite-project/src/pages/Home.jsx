import { useEffect, useState } from 'react'
import axios from 'axios'
import CartBtn from './CartBtn'







const Home = ({setCartNum, carts}) => {
  
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get("http://127.0.0.1:8000/api/v1/products/")
            setProducts(res.data)
        }
        fetchData()
    },[])
    return (
        <div>
            {
                products.map((item)=>{
                    return <div key={item.id}>
                        <a href={`/${item.id}`} style={{textDecoration: "none", color: "black"}}>
                            <h1>{item.name}</h1>
                            <p>{item.disc}</p>
                            <b>{item.price}</b>
                        </a>
                        <CartBtn {...item} setCartNum={setCartNum} carts={carts}/>
                    </div>
                })
            }
        </div>
    )
}

export default Home
