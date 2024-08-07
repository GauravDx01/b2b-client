import React from 'react'
import Login from './Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
