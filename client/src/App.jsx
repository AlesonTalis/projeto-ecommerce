import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import {
  Nav,
  Header,
  // Footer,
  Home
} from './components'
import { ProductDetail } from './components/Products'
import { Manager, ManagerEdit } from './components/Manager'

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="detail/:name/:id" element={<ProductDetail/>} />
        <Route path="/checkout/p/:id/:color/:size/:amount" element={<Navigate replace to="/" />} />
        <Route path="/cart/product/:id" element={<Navigate replace to="/" />} />
        <Route path="/quick-buy/p/:id" element={<Navigate replace to="/" />} />
        <Route path="/add-favorite/p/:id" element={<Navigate replace to="/" />} />

        <Route path="/manager/products" element={<Manager/>} />
        <Route path="/manager/edit/:pid" element={<ManagerEdit/>} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App
