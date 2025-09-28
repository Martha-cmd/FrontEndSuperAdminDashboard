import React from "react";
import { IoMdArrowUp } from "react-icons/io";
import { IoArrowDown } from "react-icons/io5";

const DasboardContainer = ({
  title,
  value,
  percentage,
  description = "Since last month",
  icon: Icon,
  iconSize = 20,
  trend = "up",
  trendColor = "green",
  stroke = 0,
}) => {
  const trendColors = {
    green: "text-green-500",
    red: "text-red-500",
  };

  const TrendIcon = trend === "up" ? IoMdArrowUp : IoArrowDown;

  return (
    <div className="lg:w-64 w-full h-36 bg-[#0D0D0D] rounded-xl py-4 px-7 text-white font-light ">
      <div className="flex justify-between mb-4">
        <p>{title}</p>
        {Icon && <Icon size={iconSize} className={`${stroke - [stroke]}`} />}
      </div>

      <h1 className="font-medium text-3xl tracking-widest pb-2">{value}</h1>

      <div
        className={`${trendColors[trendColor]} flex items-center text-[12px]`}
      >
        <TrendIcon />
        <p>{percentage}</p>
        <p className="text-white pl-1">{description}</p>
      </div>
    </div>
  );
};

export default DasboardContainer;
