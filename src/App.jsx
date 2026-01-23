import { useState } from 'react'
import Hovercard from './components/hovercard'
import './App.css'
import { Route, Routes } from 'react-router-dom'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Hovercard />} />
      </Routes>
  )
}

export default App
