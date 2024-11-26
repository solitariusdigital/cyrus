import classes from "./CoverSlider.module.scss";
import Image from "next/legacy/image";
import logoWhite from "@/assets/logoWhite.png";

export default function CoverSlider() {
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
