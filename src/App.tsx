import React from 'react'
import { Routes, Route,} from "react-router-dom";
import Welcome from './pages/Welcom'
import './index.css'
const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Welcome />} />
      </Routes>
    </div>
  )
}

export default App