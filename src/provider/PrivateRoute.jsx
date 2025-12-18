import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";
import Loading from "../Pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = use(AuthContext);
  //   console.log(user);

  // const location = useLocation();
  // console.log(location);

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user || !userStatus == "active") {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
