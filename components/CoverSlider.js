import classes from "./CoverSlider.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import logoWhite from "@/assets/logoWhite.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

export default function CoverSlider() {
  const togglePlay = (videoElement) => {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
    videoElement.muted = !videoElement.muted;
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
        muted
        onClick={(e) => togglePlay(e.currentTarget)}
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
      <div className="fadeOverlay"></div>
    </div>
  );
}
