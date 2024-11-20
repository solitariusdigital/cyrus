import classes from "./CoverSlider.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import logoWhite from "@/assets/logoWhite.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

export default function CoverSlider({ covers }) {
  return (
    <div className={classes.slider}>
      <Swiper
        spaceBetween={0}
        navigation={false}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation]}
        effect="fade"
      >
        {covers.map((project, index) => (
          <SwiperSlide key={index}>
            <div
              className={classes.media}
              onClick={() => Router.push(project.link)}
            >
              {/* {project.coverMedia.type === "image" ? ( */}
              <Image
                className={classes.image}
                src={project}
                blurDataURL={project}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                as="image"
                priority
              />
              <div className={classes.fadeOverlay}></div>
              <div className={classes.logo}>
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={logoWhite}
                  alt="logo"
                  as="image"
                  priority
                />
              </div>
              {/* ) : (
                  <video
                    className={classes.video}
                    src={project.coverMedia.link + "#t=0.1"}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                )} */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
