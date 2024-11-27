import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./GallerySlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function GallerySlider({ displayWorks, initialIndex }) {
  const { languageType, setLanguageType } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  return (
    <div className={classes.slider}>
      <div className={classes.swiper}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          navigation={true}
          mousewheel={true}
          loop={true}
          modules={[Navigation, Mousewheel]}
          onSlideChange={updateIndex}
          initialSlide={initialIndex}
        >
          {displayWorks.map((work, index) => (
            <div key={index}>
              {work.map((entry, entryIndex) => (
                <div key={entryIndex}>
                  {entry.media.map((media, mediaIndex) => (
                    <SwiperSlide key={mediaIndex}>
                      <div className={classes.imageBox}>
                        <Image
                          src={media.link}
                          blurDataURL={media.link}
                          placeholder="blur"
                          alt="image"
                          layout="fill"
                          objectFit="contain"
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className={classes.infoBox}>
                    <p>{entry[languageType].title}</p>
                    <p>{entry[languageType].location}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
