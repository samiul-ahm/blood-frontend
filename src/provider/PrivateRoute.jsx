import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading } = use(AuthContext);
  //   console.log(user);

  const location = useLocation();
  // console.log(location);

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
