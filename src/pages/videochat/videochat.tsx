import { useCallback, useEffect, useState } from "react";
import UserVideo from "./components/UserVideo";
// import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useSocket } from "@/hooks/socket/socket";
import { BadgeMinus, Filter, Send, SkipForward } from "lucide-react";
import { MessageChatProps } from "@/types/props/chat";
import peer from "@/services/peer";

const Videochat = () => {
  const [mounted, setmounted] = useState(false);
  // const [onlineusers, setonlineusers] = useState(0);
  const onlineusers = 0;
  const [message, setmessage] = useState("")
  const [allmessages, setallmessages] = useState<MessageChatProps[]>([]);
  const [localstream, setlocalstream] = useState<MediaStream>();
  const [remotestream, setremotestream] = useState<MediaStream>();
  const [videopermission, setvideopermission] = useState(false);
  const [remotesocketid, setremotesocketid] = useState<string>();

  const { socketio } = useSocket();
  const isLogin = useAppSelector(
    (state: RootState) => state.loginstatus
  );
  // const navigate = useNavigate();

  useEffect(() => {
    setmounted(true);
    // if (!(isLogin.isLogin)) {
    //   navigate("/", { replace: true });
    // }
  }, []);

  const getLocalStream = useCallback(async () => {
    try {
      const lstream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      // const rmstream = new MediaStream();
      if (lstream == null || lstream == undefined) {
        setvideopermission(false)
        return;
      }
      // setremotestream(rmstream)
      setvideopermission(true);
      setlocalstream(lstream);
      lstream.getTracks().forEach((track) => {
        peer.peer?.addTrack(track, lstream);
      })
    } catch (error) {
      setvideopermission(false);
    }
  }, [])

  const handleJoinRoom = useCallback(async (data: { name: string, gender: string, location: string }) => {
    console.log(data);
  }, []);

  const handleUserJoin = useCallback(async (data: { name: string, id: string }) => {
    setremotesocketid(data.id)
    if (data.id) {
      const offer = await peer.getOffer();
      socketio?.emit("user:call", { to: data.id, offer })
      console.log("handleUserJoin")
      console.log(data)
    }
  }, [socketio]);

  const handleIncomingCall = useCallback(async ({ from, offer }: { from: string, offer: RTCSessionDescriptionInit }) => {
    setremotesocketid(from)
    const answer = await peer?.getAnswer(offer);
    socketio?.emit("call:accepted", { to: from, answer })
    console.log("handleIncomingCall");
    console.log(from, offer, answer)
  }, [socketio])

  const handleCallAccepted = useCallback(async ({ from, answer }: { from: string, answer: RTCSessionDescriptionInit }) => {
    setremotesocketid(from)
    await peer?.setLocalDescription(answer);
    console.log("handleCallAccepted")
    console.log(from, answer)
    // if (localstream == undefined) return;
    // for (const track of localstream?.getTracks() ?? []) {
    //   peer.peer?.addTrack(track);
    // }
  }, [])


  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: { from: string, offer: RTCSessionDescriptionInit }) => {
      const ans = await peer.getAnswer(offer);
      socketio?.emit("peer:nego:done", { to: from, ans });
      console.log("handleNegoNeedIncomming")
      console.log(from, offer)
    },
    [socketio]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
    await peer.setLocalDescription(ans);
    console.log("handleNegoNeedFinal")
    console.log(ans)
  }, []);


  const addRemotetrack = (ev: RTCTrackEvent) => {
    const stream = ev.streams;
    setremotestream(stream[0]);
    console.log("addRemotetrack")
    console.log(stream)
  }

  useEffect(() => {
    peer.peer?.addEventListener("track", addRemotetrack);
    return () => {
      peer.peer?.removeEventListener("track", addRemotetrack);
    }
  }, [])

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socketio?.emit("peer:nego:needed", { offer, to: remotesocketid });
  }, [remotesocketid, socketio]);

  useEffect(() => {
    peer.peer?.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer?.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    if (socketio == null) {
      return;
    }
    socketio.on("room:join", handleJoinRoom);
    socketio.on("user:joined", handleUserJoin);
    socketio.on("incoming:call", handleIncomingCall);
    socketio.on("call:accepted", handleCallAccepted);
    socketio.on("peer:nego:needed", handleNegoNeedIncomming);
    socketio.on("peer:nego:final", handleNegoNeedFinal);
    return () => {
      socketio.off("room:join", handleJoinRoom)
      socketio.off("user:joined", handleUserJoin)
      socketio.off("incoming:call", handleIncomingCall)
      socketio.off("call:accepted", handleCallAccepted)
      socketio.off("peer:nego:needed", handleNegoNeedIncomming);
      socketio.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [socketio, isLogin, handleJoinRoom, handleUserJoin, handleIncomingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal]);

  useEffect(() => {
    if (!mounted) return;
    document.addEventListener("keydown", (e) => {
      if ((e.key == "r" || e.key == "R") && e.ctrlKey) {
        e.preventDefault();
      }
    })
    return () => {
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return;
    getLocalStream()
  }, [getLocalStream, mounted])


  const sendData = useCallback(() => {
    if (socketio == null) {
      return;
    }
    if (message.length <= 0) {
      return;
    }
    const sendmessage: MessageChatProps = { message: message, name: isLogin.username }
    setallmessages((oldmessage) => [...oldmessage, sendmessage])
    socketio.emit("userdata", sendmessage)
    setmessage("");
  }, [isLogin.username, message, socketio])

  const startRandomCall = useCallback(() => {
    if (socketio?.connected) {
      socketio?.emit("room:join", { name: isLogin.username, gender: isLogin.gender, location: isLogin.location });
    }
  }, [isLogin.gender, isLogin.location, isLogin.username, socketio])

  if (!mounted) return;

  return (
    <>
      <div className="relative w-screen h-screen overflow-y-hidden">
        <div className="flex selection:bg-none select-none max-lg:flex-col">
          <UserVideo videopermission={videopermission} src={remotestream} />
          <UserVideo videopermission={videopermission} src={localstream} />
        </div>

        <div className="lg:w-[50%] max-sm:w-full sm:w-[70%] overflow-x-hidden overflow-y-auto z-50 space-y-4 max-lg:max-w-full pb-4 justify-end h-[80vh] max-lg:h-[42vh]  absolute max-lg:left-0 lg:right-0 bottom-32 max-lg:bottom-20">
          {allmessages?.map((msg, ind) => {
            return (<div key={ind} className="sm:mx-6 md:mx-8 mx-3 bg-rose-500/20 break-words lg:w-[50%] px-2 py-2  rounded-lg">
              <h1 className="text-white font-bold">Send by {msg?.name}</h1>
              <h1 className="text-white font-medium">{msg?.message}</h1>
            </div>);
          })}

        </div>

        <div className="fixed select-none lg:bottom-0 flex lg:flex-row max-lg:flex-col max-lg:top-0 lg:justify-around lg:items-center max-lg:w-full lg:w-[50%] left-0 z-50  lg:h-32 items-end max-lg:space-y-3">

          <button onClick={startRandomCall} className="lg:bg-green-300/50 font-bold lg:text-2xl lg:h-28 lg:shadow-lg shadow-green-600 lg:w-28 rounded-lg max-lg:mr-3 max-lg:mt-3">
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
          <input onChange={(e) => { setmessage(e.target.value) }} value={message} className="w-full  placeholder:text-slate-400 border border-rose-500 h-14 px-4 text-lg outline-none focus:outline-none rounded-lg" placeholder="Chat here..." />
          <div onClick={sendData} className="h-[56px] lg:w-[60px] w-[64px] flex items-center justify-center bg-rose-500 cursor-pointer rounded-full">
            <Send size={28} color="#fff" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Videochat;
