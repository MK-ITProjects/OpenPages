import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../entities/user/model/AuthContext.jsx";

export default function AdminRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/read" replace />;
  }

  return <Outlet />;
}