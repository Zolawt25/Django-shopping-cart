import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import CartBtn from './CartBtn'







const Search = ({setCartNum, carts}) => {
    const [products, setProducts] = useState([])
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [query, setQuery] = useSearchParams()
    const search = query.get("search")

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get(`http://127.0.0.1:8000/api/v1/products/?search=${search}&min_price=${minPrice}&max_price=${maxPrice}`)
            setProducts(res.data)
        }
        fetchData()
    },[minPrice, maxPrice])
    const mapProducts = products.map((item) =>{
        return <div key={item.id}>
                    <a href={`/${item.id}`} style={{textDecoration: "none", color: "black"}}>
                        <h1>{item.name}</h1>
                        <p>{item.disc}</p>
                        <b>{item.price}</b>
                    </a>
                    <CartBtn {...item} setCartNum={setCartNum} carts={carts}/>
        </div>
    })
    const submit = (e)=>{
        e.preventDefault()
        setMinPrice(e.target[0].value)
        setMaxPrice(e.target[1].value)
    }
    return (
        <div>
            {mapProducts}
            <div>
                <button onClick={()=>{
                    setMaxPrice(2000) 
                    setMinPrice(1000)
                }}>1,000 to 2,000</button>
                <button onClick={()=>{
                    setMaxPrice(30000) 
                    setMinPrice(10000)
                }}>10,000 to 30,000</button>
                <button onClick={()=>{
                    setMaxPrice(90000) 
                    setMinPrice(40000)
                }}>40,000 to 90,000</button>
                <form onSubmit={(e)=> submit(e)}>
                    <input type="number" name="min" placeholder='Min price...'/>
                    <input type="number" name="max" placeholder='Max price...'/>
                    <button type='submit'>submit</button>
                </form>
            </div>
        </div>
    )
}

export default Search
