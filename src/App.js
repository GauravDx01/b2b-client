import React from 'react'
import Login from './Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotPreOrder from './Components/NotPreOrder'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/orders' element={<NotPreOrder/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
