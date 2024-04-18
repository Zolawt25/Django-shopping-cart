import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import Search from './pages/Search';
import Cart from './pages/Cart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie'





const App = () => {

  const [cartNum, setCartNum] = useState(true)
  const [carts, setCarts] = useState([])
  const [filterdCarts, setFilterdCarts] = useState([])
  const [remove, setRemove] = useState(false)
  const cookie = new Cookies()
  const token = cookie.get("user_access_token")
  const decoded = token ? jwtDecode(token) : ""

  useEffect(()=>{
    const fetchData = async()=>{
        const res = await axios.get("http://127.0.0.1:8000/api/v1/cart/")
        const filterData = res.data.filter((item)=>{
          if (item.useremail === decoded.email) {
            return item
          }
        })
        setCarts(filterData)
    }
    fetchData()
  },[remove, cartNum])

  // useEffect(()=>{
  //   const filterCart = carts.filter((item)=>{
  //     if (item.useremail === decoded.email) {
  //       return item
  //     }
  //   })
  //   setFilterdCarts(filterCart)
  // },[remove, cartNum])
  console.log(carts)
  // console.log("filterd:", filterdCarts)
  return (
    <div>
      <Navbar carts={carts}/>
      <Router>
        <Routes>
          <Route path='/' element={<Home setCartNum={setCartNum} carts={carts}/>}/>
          <Route path='/:id' element={<Detail setCartNum={setCartNum} carts={carts}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/search' element={<Search setCartNum={setCartNum} carts={carts}/>}/>
          <Route path='/cart' element={<Cart carts={carts} setRemove={setRemove}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
