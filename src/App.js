import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './Compnents/Add Product/AddProduct'
import FeaturedProducts from './Compnents/Featured Products/FeaturedProducts'
import Footer from './Compnents/Footer/Footer'
import Header from './Compnents/Header/Header'
import Home from './Compnents/Home/Home'
import Login from './Compnents/Login/Login'
import MyCartsPage from './Compnents/MyCarts/MyCartsPage'
import Products from './Compnents/Products/Products'
import ProtectedRoute from './Compnents/ProtectedRoute/ProtectedRoute'
import Register from './Compnents/Regsiter/Register'

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path = '/' element={<Home/>}/>
      <Route path = '/products' element={<Products/>}/>
      <Route path = '/my-carts' element={<ProtectedRoute Component={MyCartsPage}/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/register' element={<Register/>}/>
      <Route path = '/featured-product' element={<FeaturedProducts/>}/>
      <Route path = '/add-product' element={<ProtectedRoute Component={AddProduct}/>}/>
    </Routes>
    <Footer/>
    </>
    )
}

export default App