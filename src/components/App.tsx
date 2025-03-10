import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import AuthCallback from '../pages/AuthCallback'
import Admin from '../pages/Admin'
import BracketPage from '../pages/BracketPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="callback" element={<AuthCallback />} />
          <Route path="admin" element={<Admin />} />
          <Route path="bracket" element={<BracketPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App