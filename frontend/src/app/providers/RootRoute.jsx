import { Navigate } from 'react-router-dom';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';
import { LandingPage } from '../../pages/landing/LandingPage.jsx';

export function RootRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/read" replace /> : <LandingPage />;
}
