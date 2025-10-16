import React from 'react'
import { Routes, Route,} from "react-router-dom";
import './index.css'
import HomePage from './src/pages/Welcom';
import ProductsPage from './src/pages/ProductsPage';
const App: React.FC = () => {
  return(
   <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  )}
  export default App;
 



