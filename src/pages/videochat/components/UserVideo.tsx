import { VideoProps } from "@/types/props/videoprops"
import React, { useEffect, useRef, useState } from "react"
// import ReactPlayer from 'react-player'

const UserVideo: React.FC<VideoProps> = ({ src, videopermission }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    setmounted(true);
    if (src != undefined && src != null) {
      if (videoRef.current) videoRef.current.src = "";
      if (videoRef.current) videoRef.current.srcObject = src;
    }
  }, [src])

  if (!mounted) return;
  return (
    <div className="lg:h-screen relative h-[50vh] w-full lg:w-1/2">
      {/* <ReactPlayer url={src} playing /> */}
      <video
        className=" bg-black z-10 min-w-full object-cover min-h-full "
        ref={videoRef}
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
  )
}

export default UserVideo