import React from 'react'
import { Routes, Route, } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Welcome from './pages/Welcom'

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </div>
  )
}

export default App