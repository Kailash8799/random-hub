import { useEffect, useState } from "react";
import UserVideo from "./components/UserVideo";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useSocket } from "@/hooks/socket/socket";
import { BadgeMinus, Filter, Send, SkipForward } from "lucide-react";

const Videochat = () => {
  const [mounted, setmounted] = useState(false);
  const [onlineusers, setonlineusers] = useState(0);
  const [message, setmessage] = useState("")
  const { socketio } = useSocket();
  const isLogin = useAppSelector(
    (state: RootState) => state.loginstatus.isLogin
  );
  const navigate = useNavigate();

  useEffect(() => {
    setmounted(true);
    if (!isLogin) {
      navigate("/", { preventScrollReset: false });
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (socketio == null) {
      return;
    }
    if (socketio.connected) {
      socketio.emit("userdata", { name: "kailash" });
    }
    socketio.on("currentonlineuser", (data) => {
      setonlineusers(data);
    });
    return () => {
      socketio.emit("removeuser");
    };
  }, [socketio]);

  // const sendData = () => {
  //   if (socketio == null) {
  //     return;
  //   }
  //   socketio.emit("userdata", { name: "kailash" })
  // }


  if (!mounted) return;

  return (
    <>
      <div className="relative w-screen h-screen overflow-y-hidden">
        <div className="flex max-lg:flex-col">
          <UserVideo src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
          <UserVideo src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" />
        </div>

        <div className="fixed lg:bottom-0 flex lg:flex-row max-lg:flex-col max-lg:top-0 lg:justify-around lg:items-center max-lg:w-full lg:w-[50%] left-0 z-50  lg:h-32 items-end max-lg:space-y-3">

          <button className="lg:bg-green-300/50 font-bold lg:text-2xl lg:h-28 lg:shadow-lg shadow-green-600 lg:w-28 rounded-lg max-lg:mr-3 max-lg:mt-3">
            <span className="hidden lg:block text-2xl text-white">Skip</span>
            <span className="lg:hidden">
              <SkipForward size={30} color="white" />
            </span>{" "}
          </button>
          <button className="lg:bg-red-600/40 lg:h-28 lg:w-28 lg:text-2xl font-bold lg:shadow-lg shadow-red-600 rounded-lg max-lg:mr-3 max-lg:mt-3">
            <span className="hidden lg:block text-white text-xl">Stop</span>{" "}
            <span className="lg:hidden">
              <BadgeMinus size={30} color="#fff" />
            </span>{" "}
          </button>
          <button className="lg:bg-rose-500/40 lg:h-28 lg:w-28 lf:text-2xl font-bold lg:shadow-lg shadow-red-600 rounded-lg max-lg:mr-3 max-lg:mt-3">
            <span className="hidden lg:block text-white text-xl">Filter</span>{" "}
            <span className="lg:hidden ">
              <Filter size={30} color="#fff" />
            </span>{" "}
          </button>
        </div>

        <div className="fixed top-2 left-2 z-50">
          <h1 className="text-2xl font-bold text-white">
            {" "}
            {onlineusers} users online
          </h1>
        </div>
        <div className="fixed flex lg:space-x-3 space-x-1  lg:px-7 px-2 items-center justify-center max-lg:w-full lg:h-32 h-20 bottom-0  lg:w-[50%] right-0 z-50">
          <input onChange={(e) => { setmessage(e.target.value) }} value={message} className="w-full  placeholder:text-slate-900 border border-rose-500 h-14 px-4 text-lg outline-none focus:outline-none rounded-lg" placeholder="Chat" />
          <div className="h-[56px] lg:w-[60px] w-[64px] flex items-center justify-center bg-rose-500 cursor-pointer rounded-full">
            <Send size={28} color="#fff" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Videochat;
