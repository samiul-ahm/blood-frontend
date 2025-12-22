import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  //   console.log(user);

  const location = useLocation();
  // console.log(location);

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user || userStatus !== "active") {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;
