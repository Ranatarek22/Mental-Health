import React, { useEffect } from "react";
import { useAuthStore } from "../hooks/use-auth-store";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { token, isValidToken, isAuthenticated } = useAuthStore();
  useEffect(() => {
    isValidToken();
  }, [token, isValidToken]);

  const isAuth = isAuthenticated;
  //wraping components(component inside another component) <Route></Route>
  return <>{isAuth ? children : <Navigate to={"/"} />}</>;
};

export default PrivateRoute;
