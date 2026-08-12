import { Navigate } from 'react-router-dom';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
