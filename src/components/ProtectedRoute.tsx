import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}