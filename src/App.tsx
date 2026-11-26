import { LoginPage } from './components/LoginPage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Route, Routes, Navigate } from 'react-router';
import { MainMenuPage } from './components/MainMenuPage';
import { ProfilePage } from './components/ProfilePage';
import { PlayPage } from './components/PlayPage';
import { SettingsPage } from './components/SettingsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css'

function App() {

  const { user, loading } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={loading ? <p>Loading...</p> : user ? <Navigate to="/" /> : <LoginPage />} />
      <Route element={<ProtectedRoute />} >
        <Route path="/" element={<MainMenuPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
