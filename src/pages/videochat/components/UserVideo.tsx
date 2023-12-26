import { VideoProps } from "@/types/props/videoprops"
import React from "react"

const UserVideo: React.FC<VideoProps> = ({ src }) => {
  return (
    <div className="lg:h-screen h-[50vh] w-full lg:w-1/2">
      <video
        className=" bg-black min-w-full object-cover min-h-full "
        src={src}
        loop={true}
        playsInline
        onContextMenu={(e) => {
          e.preventDefault()
        }}
        autoPlay={true}
        muted={true}
      />
    </div>
  )
}

export default UserVideo