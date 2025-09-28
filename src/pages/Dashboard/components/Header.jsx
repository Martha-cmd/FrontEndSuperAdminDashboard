import React from "react";
import ProfileImage from "../../../assets/images.jpeg";

const Header = ({ pageTitle }) => {
  let user = null;

  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      user = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
  }

  return (
    <div className="flex justify-between mb-5">
      <h1 className="md:text-xl texr-[24px] text-gray-400 font-bold tracking-widest">
        {pageTitle}
      </h1>
      <div className="flex items-center gap-4">
        <div className="md:w-12 md:h-12 w-8 h-8 bg-gray-400 md:rounded-full rounded-[50px]">
          <img
            src={ProfileImage}
            alt="profile image"
            className="md:w-14 md:h-12 rounded-full md:bg-cover"
          />
        </div>
        <h1 className="text-white text-[13px]">{user?.name || "Guest"}</h1>
      </div>
    </div>
  );
};

export default Header;
