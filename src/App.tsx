import React from 'react';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage.tsx';
import HomePage from './pages/Welcom.tsx';

const App: React.FC = () => {
  return(
   <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  )}
  export default App;
 
