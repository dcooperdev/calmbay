import { LoginPage } from './components/LoginPage';
import './App.css'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const { user, loading } = useContext(AuthContext);

  return (
    <>
      <h1>Vite + React</h1>

      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <p>Welcome, {user.email}!</p>
      ) : (
        <LoginPage />
      )}
    </>
  )
}

export default App
