import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GlobeLogo from "../../../assets/image.png";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuUserRound } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { IoClose, IoMenuSharp } from "react-icons/io5";

const SideBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.includes(path);
  };

  const navItems = [
    { path: "/home/analytics", icon: BsGraphUpArrow, label: "Analytics" },
    { path: "/home/users", icon: LuUserRound, label: "Users" },
  ];

  const bottomNavItems = [
    { path: "/", icon: FiSettings, label: "Settings" },
    { path: "/register", icon: BiLogOut, label: "Sign Out" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <main className="w-64 bg-[#0D0D0D] h-screen pt-5 lg:flex flex-col hidden">
        <div className="flex gap-2 items-center mb-16 px-10 cursor-pointer">
          <img src={GlobeLogo} alt="logo" className="w-6 h-6" />
          <h1 className="text-white text-base">Business</h1>
        </div>

        <ul className="w-full flex flex-col gap-4 px-6 mb-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`w-full font-light flex gap-5 items-center text-[15px] px-4 py-2 rounded-full transition-all duration-200 hover:cursor-pointer ${
                    active
                      ? "text-black bg-gray-200 font-medium"
                      : "text-white hover:text-white"
                  }`}
                >
                  <Icon />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <hr className="border-1 border-gray-700 mx-6" />

        <ul className="w-full flex flex-col gap-4 px-6 pt-5 mb-20">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li>
                <Link
                  className={`w-full text-white font-light flex gap-5 items-center text-[15px] px-4 py-2 rounded-full transition-all duration-200 hover:cursor-pointer ${
                    active
                      ? "bg-white text-black font-normal"
                      : "hover:bg-gray-200 hover:text-black hover:font-normal"
                  }`}
                >
                  <Icon />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <main className="w-full px-7 py-4 lg:hidden flex justify-between bg-[#0D0D0D]">
        <div className="flex gap-2 items-center">
          <img src={GlobeLogo} alt="logo" className="w-6 h-6" />
          <h1 className="text-white text-base">Business</h1>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <IoMenuSharp size={24} />
        </button>
      </main>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-[#0D0D0D] z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div className="flex gap-2 items-center">
            <img src={GlobeLogo} alt="logo" className="w-6 h-6" />
            <h1 className="text-white text-base">Business</h1>
          </div>
          <button
            onClick={closeMobileMenu}
            className="text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <IoClose size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col h-full pt-6 pb-8">
          <ul className="flex flex-col gap-2 px-4 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`w-full font-light flex gap-4 items-center text-[15px] px-4 py-2 rounded-full transition-all duration-200 ${
                      active
                        ? "text-black bg-gray-200 font-medium"
                        : "text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <hr className="border-1 border-gray-700 mx-4 my-4" />

          <ul className="flex flex-col gap-2 px-4">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    // to={item.path}
                    onClick={closeMobileMenu}
                    className={`w-full font-light flex gap-4 items-center text-[15px] px-4 py-3 rounded-full transition-all duration-200 ${
                      active
                        ? "bg-transparent text-white font-normal"
                        : "text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
