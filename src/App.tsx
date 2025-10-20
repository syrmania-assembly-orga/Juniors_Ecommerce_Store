import React from 'react';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Welcome from './pages/Welcom';
import ProductsPage from './pages/ProductsPage.tsx';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  )
}

export default App