import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar></Navbar>
      </header>
      <main className="grow my-16">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
