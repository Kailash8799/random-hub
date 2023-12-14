import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomeLeftSide = () => {
  return (
    <div className="lg:w-[35vw] selection:bg-none space-y-3 text-center  md:h-2/3 items-center justify-center">
      <h1 className="text-xl font-medium text-gray-900  roboto">
        Make new friends face-to-face
      </h1>
      <h1 className="text-4xl font-medium text-gray-900  roboto">
        Meetings more efficient, engaging, and effortless.
      </h1>
      <h2 className="text-xl font-medium text-gray-700">
        Whether you're connecting with team members across the globe or
        presenting to clients, your visuals will be top-notch.
      </h2>
      <div className="space-x-5">
        <Button color="black" asChild>
          <Link to={"/login"}>Try for free</Link>
        </Button>
        <Button variant="outline">Watch a demo</Button>
      </div>
    </div>
  );
};

export default HomeLeftSide;
