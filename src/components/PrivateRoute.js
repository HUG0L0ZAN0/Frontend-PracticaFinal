import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token
    ? children                       // Si hay token, renderiza lo que envuelva
    : <Navigate to="/login" replace />;  // Si no, redirige al login
}
