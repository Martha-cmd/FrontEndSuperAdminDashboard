import React, { useState } from "react";
import UserTable from "../components/UserTable";
import { IoIosSearch } from "react-icons/io";
import Header from "../components/Header";
import { RiAddFill } from "react-icons/ri";
import AddUser from "../components/AddUser";

const Users = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [search, setSearch] = useState("");

  const openAddUser = () => {
    setIsAddUserOpen(true);
  };

  const closeAddUser = () => {
    setIsAddUserOpen(false);
  };

  return (
    <main className="w-full md:h-screen h-full pt-5 md:px-7 px-4 bg-black">
      <Header pageTitle="Users" />

      {/* Search */}
      <div className="text-gray-200 flex md:flex-row flex-col-reverse justify-between items-center gap-5">
        <div className="flex items-center gap-2 py-2 px-5 md:w-96 w-full bg-transparent border-[1px] border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-black text-black rounded-full">
          <IoIosSearch color="white" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex bg-transparent border-none appearance-none focus:outline-none focus:ring-0 focus:border-none text-white"
            placeholder="Search users"
          />
        </div>

        <div className="md:w-auto w-full flex justify-end">
          <button
            onClick={openAddUser}
            className="px-2 py-1 bg-orange-500 text-white text-[14px] font-medium rounded flex gap-2 items-center"
          >
            <RiAddFill />
            Add User
          </button>
        </div>
      </div>

      <UserTable search={search} />

      <AddUser isOpen={isAddUserOpen} onClose={closeAddUser} />
    </main>
  );
};

export default Users;
