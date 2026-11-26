import { LoginPage } from './components/LoginPage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Route, Routes, Navigate } from 'react-router';
import { MainMenuPage } from './components/MainMenuPage';
import './App.css'

function App() {

  const { user, loading } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={loading ? <p>Loading...</p> : user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/" element={loading ? <p>Loading...</p> : user ? <MainMenuPage /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
