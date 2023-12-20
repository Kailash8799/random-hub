import { Link } from "react-router-dom";

const HomeRightSide = () => {
  return (
    <>
      <div className="lg:w-[35vw] selection:bg-none space-y-14 text-center  md:h-2/3 items-center justify-center">
        <h1 className="text-xl font-medium text-gray-900  roboto">
          Make new friends face-to-face
        </h1>
        <div className="space-y-3 items-center justify-center flex flex-col">
          <button className="border-[1px] border-black rounded-full px-5 py-4 font-bold">
            Guys & Girls
          </button>
          <Link to={"/videochat"}>
            <button className=" bg-[#fffc01]  rounded-full px-5 py-4 font-bold">
              Start Video Chat
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeRightSide;
