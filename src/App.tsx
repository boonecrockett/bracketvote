import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Leaderboard from './components/Leaderboard';
import Bracket from './components/Bracket';
import Admin from './pages/Admin';
import LoginPage from './pages/LoginPage';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="bracket" element={<Bracket />} />
            <Route path="admin" element={<Admin />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="auth/callback" element={<AuthCallback />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;