import React, { useState } from "react";
import { TbCheckupList } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import DasboardContainer from "../components/DasboardContainer";
import Header from "../components/Header";
import { IoIosSearch } from "react-icons/io";
import UserTable from "../components/UserTable";

const Analytics = () => {
  const [search, setSearch] = useState("");

  return (
    <main className="w-full md:h-screen md:pb-4 pb-10 h-full pt-5 md:px-7 px-4 bg-black">
      <Header pageTitle="Analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 align-center">
        <DasboardContainer
          title="Orders"
          value="205"
          percentage="8.2%"
          icon={TbCheckupList}
          iconSize={40}
          trend="up"
          stroke={1}
        />

        {/* Approved */}
        <DasboardContainer
          title="Approved"
          value="35"
          percentage="8.2%"
          icon={FaRegCheckCircle}
          trend="up"
        />

        {/* Approved */}
        <DasboardContainer
          title="Revenue"
          value="35500"
          percentage="8.2%"
          icon={MdOutlineAttachMoney}
          iconSize={40}
          trend="down"
          trendColor="red"
        />

        {/* Approved */}
        <DasboardContainer
          title="Users"
          value="2605"
          percentage="8.2%"
          icon={LuUserRound}
          iconSize={40}
          trend="up"
        />
      </div>

      {/* Search */}
      <div className="w-full mt-16 text-gray-200 flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4">
        <h1 className="text-xl">Users</h1>

        <div className="flex items-center gap-2 py-2 px-5 md:w-96 w-full bg-transparent border-[1px] border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-black text-black rounded-full">
          <IoIosSearch color="white" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-white"
            placeholder="Search users"
          />
        </div>
      </div>

      <UserTable search={search} />
    </main>
  );
};

export default Analytics;
