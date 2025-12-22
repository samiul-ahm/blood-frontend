import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading";

// const PrivateRoute = ({ children }) => {
//   const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
//   //   console.log(user);

//   const location = useLocation();
//   // console.log(location);

//   if (loading || roleLoading) {
//     return <Loading></Loading>;
//   }

//   if (!user || userStatus !== "active") {
//     return <Navigate state={location.pathname} to={"/login"}></Navigate>;
//     // return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// };


const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  const location = useLocation();

  // 1. Wait while ANY loading is happening
  if (loading || roleLoading) {
    return <Loading />;
  }

  // 2. Check if user exists
  if (!user) {
    return <Navigate state={location.pathname} to="/login" replace />;
  }

  // 3. Check if user is blocked (only after roleLoading is finished)
  if (userStatus === "blocked") {
    // Optionally log them out or show a "Blocked" page
    return <Navigate to="/login" replace />; 
  }

  return children;
};

export default PrivateRoute;
