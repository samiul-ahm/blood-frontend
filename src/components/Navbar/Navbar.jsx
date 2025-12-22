import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import Login from "../../Pages/Login";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // alert("You have been logged out");
        Swal.fire({
          title: "You have successfully logged out!",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink>All request</NavLink>
            </li>
            <li>
              <NavLink>Search</NavLink>
            </li>
            <li>
              <Link to={"/donate"}>Donate</Link>
            </li>
          </ul>
        </div>
        <NavLink to={"/"} className="btn btn-ghost text-xl">
          Bloood Bank
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to={"/all-request"}>All request</NavLink>
          </li>
          <li>
            <NavLink to={"/search"}>Search</NavLink>
          </li>
          <li>
            <Link to={"/donate"}>Donate</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user && (
          <Link to={"/dashboard"} className="btn mr-2 bg-pink-400">
            Dashborad
          </Link>
        )}

        {user ? (
          <button onClick={handleLogout} className="btn btn-neutral">
            Logout
          </button>
        ) : (
          <Link to={"/login"} className="btn btn-secondary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
