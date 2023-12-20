import { CardProps } from "@/types/props/cardprops";
import React from "react";

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <>
      <div className="mt-10 select-none cursor-pointer">
        <div className="p-10 mx-auto rounded-3xl  hover:-translate-y-5 h-[650px] transition-transform transform-cpu w-[95%] md:w-[90%] flex-wrap border-solid shadow-sm shadow-slate-400/40 hover:shadow-slate-700/50 bg-slate-300/10 hover:bg-zinc-700/10 flex-col justify-center items-center ">
          <div className="img-container select-none">
            <img
              className="img-container mt-1  flex items-center justify-center "
              src={`${item.imgUrl}`}
              alt=""
            />
          </div>
          <h1 className=" my-6 font-bold text-3xl">{item.title}</h1>
          <p className="text-2xl font-thin mt-10">{item.desc}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
