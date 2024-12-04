import { useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import classes from "./GallerySlider.module.scss";
import { toFarsiNumber } from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function GallerySlider({ displayWorks, initialIndex }) {
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  const currentWork =
    displayWorks[initialIndex.year][current].data[languageType];

  return (
    <div className={classes.slider}>
      <div className={language ? classes.infoBox : classes.infoBoxReverse}>
        <p>{currentWork?.title}</p>
        <p>{currentWork?.subCategory}</p>
        <p>{currentWork?.location}</p>
        <p style={{ direction: "ltr" }}>
          {language ? toFarsiNumber(currentWork?.size) : currentWork?.size}
        </p>
        <p>{language ? toFarsiNumber(currentWork?.year) : currentWork?.year}</p>
        <p>{currentWork?.description}</p>
      </div>
      <div className={classes.swiper}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          navigation={true}
          mousewheel={true}
          loop={true}
          initialSlide={initialIndex.entryIndex}
          modules={[Navigation, Mousewheel]}
          onSlideChange={updateIndex}
        >
          {displayWorks[initialIndex.year].map((work, workIndex) => (
            <SwiperSlide key={workIndex}>
              <div className={classes.imageBox}>
                <Image
                  src={work.link}
                  blurDataURL={work.link}
                  placeholder="blur"
                  alt={work.data[languageType].title}
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
