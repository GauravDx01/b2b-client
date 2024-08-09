import React from 'react'
import Login from './Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotPreOrder from './Components/NotPreOrder'
import PreOrder from './Components/PreOrder'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/order' element={<NotPreOrder/>}/>
      <Route path='/pre-order' element={<PreOrder/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
