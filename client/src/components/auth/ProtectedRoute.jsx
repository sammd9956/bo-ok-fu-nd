import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children, user, redirect = "/log-in"}) => {
  if(!user) return <Navigate to={redirect} />

  return children ? children : <Outlet />
};

export default ProtectedRoute;