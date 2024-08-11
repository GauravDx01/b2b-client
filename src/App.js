import React from 'react'
import Login from './Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotPreOrder from './Components/NotPreOrder'
import PreOrder from './Components/PreOrder'
import Orders from './Orders/Orders'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/order' element={<NotPreOrder/>}/>
      <Route path='/pre-order' element={<PreOrder/>}/>
      <Route path='/order-placed' element={<Orders/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
