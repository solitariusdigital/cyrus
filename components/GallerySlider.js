import { useState } from "react";
import Image from "next/legacy/image";
import classes from "./GallerySlider.module.scss";
import Progress from "@/components/Progress";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function GallerySlider({ media }) {
  const [current, setCurrent] = useState(0);

  const calculatePercentage = (index) => {
    return ((index + 1) / media.filter((image) => image.active).length) * 100;
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  return (
    <div className={classes.slider}>
      <div className={classes.progress}>
        <Progress color={"#fdb714"} completed={calculatePercentage(current)} />
      </div>
      <div className={classes.swiper}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          navigation={true}
          mousewheel={true}
          loop={true}
          modules={[Navigation, Mousewheel]}
          onSlideChange={updateIndex}
        >
          {media
            .filter((image) => image.active)
            .map((image, index) => (
              <SwiperSlide key={index}>
                <div className={classes.image}>
                  {image.type === "image" ? (
                    <Image
                      src={image.link}
                      blurDataURL={image.link}
                      placeholder="blur"
                      alt={image.link}
                      layout="fill"
                      objectFit="contain"
                      as="image"
                      priority
                    />
                  ) : (
                    <video
                      className={classes.video}
                      src={image.link + "#t=0.1"}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
