import { data } from "@/constant/cards/data";
import Card from "./Card";

const Cards = () => {
  return (
    <>
      <div className="text-center mt-20">
        <h1 className="font-bold text-6xl">Meet People Like Never Before</h1>
        <div className="md:grid md:grid-cols-2 mt-10 items-center justify-center lg:mx-32   sm:mx-2 mx-1">
          {data?.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
