import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);

  const [userStatus, setUserStatus] = useState("");

  // console.log(loading, user);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update user
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  };

  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (!user) return;
  //   axios.get(`http://localhost:5000/users/role/${user.email}`).then((res) => {
  //     setRole(res.data.role);
  //     setUserStatus(res.data.status);
  //     setRoleLoading(false);
  //   });
  // }, [user]);

useEffect(() => {
  if (!user) {
    setRole("");
    setUserStatus("");
    setRoleLoading(false); 
    return;
  }

  setRoleLoading(true);

  axios
    .get(`http://localhost:5000/users/role/${user.email}`)
    .then((res) => {
      setRole(res.data.role);
      setUserStatus(res.data.status);
    })
    .catch(() => {
      setRole("");
      setUserStatus("");
    })
    .finally(() => {
      setRoleLoading(false);
    });
}, [user]);


  console.log(role);

  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
    role,
    roleLoading,
    userStatus,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
