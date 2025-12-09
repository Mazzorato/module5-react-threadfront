// import { useState } from 'react'
import './App.css'
import Profil from './components/profile/profile.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      
        <Profil />
      
    </>
  )
}

export default App
