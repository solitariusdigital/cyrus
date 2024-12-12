import { useRef, useState } from "react";
import classes from "./CoverSlider.module.scss";
import Image from "next/legacy/image";
import logoWhite from "@/assets/logoWhite.png";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import MusicOffIcon from "@mui/icons-material/MusicOff";

export default function CoverSlider() {
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);
  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={classes.cover}>
      <video
        className={classes.video}
        src={"https://cyrus.storage.c2.liara.space/assets/intro.mp4" + "#t=0.1"}
        autoPlay
        loop
        playsInline
        preload="metadata"
        muted={isMuted}
        onClick={handleVideoClick}
        ref={videoRef}
      />
      <div className={`${classes.logo} animate__animated animate__fadeOut`}>
        <Image
          layout="fill"
          objectFit="contain"
          src={logoWhite}
          alt="logo"
          as="image"
          priority
        />
      </div>
      <div className={classes.control} onClick={handleVideoClick}>
        {isMuted ? (
          <MusicOffIcon className="icon" sx={{ color: "#fafbf6" }} />
        ) : (
          <AudiotrackIcon className="icon" sx={{ color: "#fafbf6" }} />
        )}
      </div>
      <div className="fadeOverlay"></div>
    </div>
  );
}
