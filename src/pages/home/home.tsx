import HomeLeftSide from "@/pages/home/components/HomeLeftSide";
import HomeRightSide from "@/pages/home/components/HomeRightSide";

const Home = () => {
  return (
    <div className="w-full h-[92vh] bg-gray-400">
      <HomeLeftSide />
      <HomeRightSide />
    </div>
  );
};

export default Home;
