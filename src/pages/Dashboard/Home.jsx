import React from "react";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <main className="w-full h-screen lg:flex  gap-2 bg-black">
      <SideBar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default Home;
