import { useState } from "react";
import Image from "next/legacy/image";
import classes from "./GallerySlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function GallerySlider({ media }) {
  const [current, setCurrent] = useState(0);

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  return (
    <div className={classes.slider}>
      <div className={classes.infoBox}>
        <h2>art {current}</h2>
        <p>info 1</p>
        <p>info 2</p>
        <p>info 3</p>
        <p>info 4</p>
        <p>info 5</p>
        <p>info 6</p>
        <p>info 7</p>
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
          {media.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={classes.imageBox}>
                <Image
                  src={image}
                  blurDataURL={image}
                  placeholder="blur"
                  alt="image"
                  layout="fill"
                  objectFit="contain"
                  as="image"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
