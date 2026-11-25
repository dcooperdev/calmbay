import { LoginPage } from './components/LoginPage';
import './App.css'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const { user, loading } = useContext(AuthContext);

  return (
    <>
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
