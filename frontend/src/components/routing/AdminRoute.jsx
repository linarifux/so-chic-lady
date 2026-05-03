import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If the user exists and is an admin, render the nested routes (Outlet)
  // Otherwise, redirect them to the login page safely
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;