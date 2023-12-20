import HomeLeftSide from "@/pages/home/components/HomeLeftSide";
import HomeRightSide from "@/pages/home/components/HomeRightSide";
import Features from "@/pages/home/components/Features";
import Cards from "@/pages/home/components/Cards";
import Faq from "@/pages/home/components/Faq";

const Home = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="w-full space-y-16 md:flex md:h-[600px]">
          <div className="md:w-1/2 mt-16 md:mt-0 flex  items-center justify-center w-full">
            <HomeLeftSide />
          </div>
          <div className="md:w-1/2 flex relative items-center justify-center w-full">
            <HomeRightSide />
          </div>
        </div>
        <Features />
        <Cards />
        <Faq />
      </div>
    </>
  );
};

export default Home;
