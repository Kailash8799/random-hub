import { useCallback, useEffect, useRef, useState } from "react";
// import UserVideo from "./components/UserVideo";
// import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useSocket } from "@/hooks/socket/socket";
import { BadgeMinus, Filter, Send, SkipForward } from "lucide-react";
import { MessageChatProps } from "@/types/props/chat";
// import peer from "@/services/peer";

const Videochat = () => {
  const [mounted, setmounted] = useState(false);
  // const [onlineusers, setonlineusers] = useState(0);
  const onlineusers = 0;
  const [message, setmessage] = useState("")
  const [allmessages, setallmessages] = useState<MessageChatProps[]>([]);
  // const [localstream, setlocalstream] = useState<MediaStream>();
  // const [remotestream, setremotestream] = useState<MediaStream>();
  const [videopermission, setvideopermission] = useState(false);
  const [lobby, setLobby] = useState(true);
  // const [remotesocketid, setremotesocketid] = useState<string>();
  const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
  const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
  // const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
  // const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
  // const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

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
  }, [isLogin]);

  const getLocalStream = useCallback(async () => {
    try {
      const lstream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      // const rmstream = new MediaStream();
      if (lstream == null || lstream == undefined) {
        setvideopermission(false)
        return;
      }
      setvideopermission(true);
      // setlocalstream(lstream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = lstream
      }
      const audioTrack = lstream.getAudioTracks()[0]
      const videoTrack = lstream.getVideoTracks()[0]
      setLocalAudioTrack(audioTrack);
      setlocalVideoTrack(videoTrack);
      if (socketio?.connected) {
        socketio?.emit("room:join", { name: isLogin.username, gender: isLogin.gender, location: isLogin.location, remoteId: null });
      }
    } catch (error) {
      setvideopermission(false);
    }
  }, [isLogin, socketio])

  useEffect(() => {
    if (!mounted) return;
    getLocalStream()
  }, [getLocalStream, mounted])

  const handleJoinRoom = useCallback(async (data: { name: string, gender: string, location: string }) => {
    console.log(data);
  }, []);

  // const handleUserJoin = useCallback(async (data: { name: string, id: string }) => {
  //   setremotesocketid(data.id)
  //   if (data.id) {
  //     if (peer.peer) {
  //       peer.peer.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
  //         if (e.candidate) {
  //           socketio?.emit("ice-candidate", { id: data.id, candidate: e.candidate });
  //         }
  //       }
  //     }
  //     const offer = await peer.getOffer();
  //     socketio?.emit("user:call", { to: data.id, offer })
  //   }
  // }, [socketio]);

  const handleSendOffer = useCallback(async ({ roomId }: { roomId: string }) => {
    console.log("sending offer");
    setLobby(false);
    const pc = new RTCPeerConnection();
    setSendingPc(pc);
    if (localVideoTrack) {
      console.error("added tack");
      console.log(localVideoTrack)
      pc.addTrack(localVideoTrack)
    }
    if (localAudioTrack) {
      console.error("added tack");
      console.log(localAudioTrack)
      pc.addTrack(localAudioTrack)
    }

    pc.onicecandidate = async (e) => {
      console.log("receiving ice candidate locally");
      if (e.candidate) {
        socketio?.emit("add-ice-candidate", {
          candidate: e.candidate,
          type: "sender",
          roomId
        })
      }
    }

    pc.onnegotiationneeded = async () => {
      console.log("on negotiation neeeded, sending offer");
      const sdp = await pc.createOffer();
      pc.setLocalDescription(sdp)
      socketio?.emit("offer", {
        sdp,
        roomId
      })
    }

  }, [localAudioTrack, localVideoTrack, socketio])


  const handleOffer = useCallback(async ({ roomId, sdp: remoteSdp }: { roomId: string, sdp: RTCSessionDescriptionInit }) => {
    console.log("received offer");
    setLobby(false);
    const pc = new RTCPeerConnection();
    pc.setRemoteDescription(remoteSdp)
    const sdp = await pc.createAnswer();

    pc.setLocalDescription(sdp)
    const stream = new MediaStream();
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
    }
    setReceivingPc(pc);

    pc.onicecandidate = async (e) => {
      if (!e.candidate) {
        return;
      }
      console.log("omn ice candidate on receiving side");
      if (e.candidate) {
        socketio?.emit("add-ice-candidate", {
          candidate: e.candidate,
          type: "receiver",
          roomId
        })
      }
    }

    socketio?.emit("answer", {
      roomId,
      sdp: sdp
    });

    setTimeout(() => {
      const track1 = pc.getTransceivers()[0].receiver.track
      const track2 = pc.getTransceivers()[1].receiver.track
      if (remoteVideoRef.current !== null && remoteVideoRef.current !== undefined) {
        remoteVideoRef.current.srcObject = new MediaStream();
        remoteVideoRef.current.srcObject.addTrack(track1)

        remoteVideoRef.current.srcObject.addTrack(track2)
        remoteVideoRef.current.play();
      }
    }, 3000)

  }, [socketio])

  const handleAnswer = useCallback(async ({ roomId, sdp: remoteSdp }: { roomId: string, sdp: RTCSessionDescriptionInit }) => {
    setLobby(false);
    setSendingPc(pc => {
      pc?.setRemoteDescription(remoteSdp)
      return pc;
    });
    console.log("loop closed" + roomId);
  }, [])

  const handleAddIceCandidate = useCallback(
    async ({ candidate, type }: { candidate: RTCIceCandidateInit, type: string }) => {
      console.log("add ice candidate from remote");
      console.log({ candidate, type })
      if (type == "sender") {
        setReceivingPc(() => {
          if (!receivingPc) {
            console.error("receicng pc nout found")
          }
          receivingPc?.addIceCandidate(candidate)
          return receivingPc;
        });
      } else {
        setSendingPc(() => {
          if (!sendingPc) {
            console.error("sending pc nout found")
          }
          sendingPc?.addIceCandidate(candidate)
          return sendingPc;
        });
      }
    },
    [receivingPc, sendingPc]
  );

  // const addRemotetrack = (ev: RTCTrackEvent) => {
  //   const stream = ev.streams;
  //   setremotestream(stream[0]);
  // }

  // useEffect(() => {
  //   // peer.peer?.addEventListener("track", addRemotetrack);
  //   return () => {
  //     // peer.peer?.removeEventListener("track", addRemotetrack);
  //     // peer.peer?.close();
  //   }
  // }, [])

  // const handleNegoNeeded = useCallback(async () => {
  //   const offer = await peer.getOffer();
  //   socketio?.emit("peer:nego:needed", { offer, to: remotesocketid });
  // }, [remotesocketid, socketio]);

  const handleLobby = useCallback(async () => {
    setLobby(true);
  }, []);

  const handleRemoteDisconnect = useCallback(async () => {
    setLobby(true);
    alert("Removed")
  }, []);

  const handleSkipUser = useCallback(() => {
    setLobby(true);
    alert("Skipped")
  }, [])

  // useEffect(() => {
  //   // if (peer.peer) {
  //   //   peer.peer.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
  //   //     if (e.candidate) {
  //   //       socketio?.emit("ice-candidate", { id: remotesocketid, candidate: e.candidate });
  //   //     }
  //   //   }
  //   // }
  //   peer.peer?.addEventListener("negotiationneeded", handleNegoNeeded);
  //   return () => {
  //     peer.peer?.removeEventListener("negotiationneeded", handleNegoNeeded);
  //   };
  // }, [handleNegoNeeded, remotesocketid, socketio]);

  useEffect(() => {
    if (socketio == null) {
      return;
    }
    socketio.on("room:join", handleJoinRoom);
    // socketio.on("user:joined", handleUserJoin);
    socketio.on("send-offer", handleSendOffer); // offer
    socketio.on("offer", handleOffer); // offer
    socketio.on("answer", handleAnswer);  // answer
    socketio.on("lobby", handleLobby);
    socketio.on("add-ice-candidate", handleAddIceCandidate);
    socketio.on("remotedisconnect", handleRemoteDisconnect);
    socketio.on("user:skiped", handleSkipUser);
    return () => {
      socketio.off("room:join", handleJoinRoom)
      // socketio.off("user:joined", handleUserJoin)
      socketio.off("send-offer", handleSendOffer); // offer
      socketio.off("offer", handleOffer); // offer
      socketio.off("answer", handleAnswer);  // answer
      socketio.off("lobby", handleLobby);
      socketio.off("add-ice-candidate", handleAddIceCandidate);
      socketio.off("remotedisconnect", handleRemoteDisconnect);
      socketio.off("user:skiped", handleSkipUser);
    };
  }, [handleAddIceCandidate, handleAnswer, handleJoinRoom, handleLobby, handleOffer, handleRemoteDisconnect, handleSendOffer, handleSkipUser, socketio]);

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
    if (socketio !== null) {
      socketio?.emit("skip:user")
    }
  }, [socketio])

  if (!mounted) return;

  return (
    <>
      <div className="relative w-screen h-screen overflow-y-hidden">
        <div className="flex selection:bg-none select-none max-lg:flex-col">
          <div className="lg:h-screen relative h-[50vh] w-full lg:w-1/2">
            {/* <ReactPlayer url={src} playing /> */}
            {!lobby ? <video
              className=" bg-black z-10 min-w-full object-cover min-h-full "
              ref={remoteVideoRef}
              loop={true}
              playsInline
              onContextMenu={(e) => {
                e.preventDefault()
              }}
              autoPlay={true}
            >
            </video> : <div className=" min-w-full bg-black flex items-center justify-center object-cover min-h-full">
              <div>
                <h1 className="text-white text-lg">Connecting you with your interest</h1>
              </div>
            </div>}
            {!videopermission && <div className="absolute top-[40%] w-full ">
              <h1 className="font-bold text-xl break-words text-center text-white">You can't see video of other user if you disable your video</h1>
              <h1 className="font-bold text-xl break-words text-center text-white">Enable video and refresh page to talk to other people in world</h1>
            </div>}
          </div>
          <div className="lg:h-screen relative h-[50vh] w-full lg:w-1/2">
            {/* <ReactPlayer url={src} playing /> */}
            <video
              className=" bg-black z-10 min-w-full object-cover min-h-full "
              ref={localVideoRef}
              loop={true}
              playsInline
              onContextMenu={(e) => {
                e.preventDefault()
              }}
              autoPlay={true}
              muted={true}
            >
            </video>
            {!videopermission && <div className="absolute top-[40%] w-full ">
              <h1 className="font-bold text-xl break-words text-center text-white">You can't see video of other user if you disable your video</h1>
              <h1 className="font-bold text-xl break-words text-center text-white">Enable video and refresh page to talk to other people in world</h1>
            </div>}
          </div>
          {/* <UserVideo videopermission={videopermission} src={remoteVideoRef.current?.srcObject} />
          <UserVideo videopermission={videopermission} src={localstream} /> */}
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
