import { useState, useEffect, useContext, Fragment, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import VisibilitySensor from "react-visibility-sensor";

export default function Home() {
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const [isVisiblePaintings, setIsVisiblePaintings] = useState(false);
  const [isVisibleMovies, setIsVisibleMovies] = useState(false);
  const [isVisibleTravels, setIsVisibleTravels] = useState(false);

  let images = [
    "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg",
    "https://eshareh.storage.iran.liara.space/cover/cov602084/img5322.jpg",
    "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg",
    "https://eshareh.storage.iran.liara.space/cover/cov156042/img6851.jpg",
  ];

  const generateSwipeCount = () => {
    let count = 0;
    switch (screenSize) {
      case "desktop":
        count = 3;
        break;
      case "tablet-landscape":
        count = 2;
        break;
      case "tablet-portrait":
        count = 1;
        break;
      case "mobile":
        count = 1;
        break;
    }
    return count;
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  return (
    <div className={classes.container}>
      <div className={classes.cover}>
        <Image
          src={
            "https://eshareh.storage.iran.liara.space/cover/cov602084/img5322.jpg"
          }
          blurDataURL={
            "https://eshareh.storage.iran.liara.space/cover/cov602084/img5322.jpg"
          }
          placeholder="blur"
          alt="cover"
          layout="fill"
          objectFit="cover"
          as="image"
          priority
        />
      </div>
      <div
        className={classes.swiperContainer}
        onClick={() => Router.push("/paintings")}
      >
        <VisibilitySensor
          scrollDelay={250}
          onChange={(isVisible) => setIsVisiblePaintings(isVisible)}
        >
          <h2
            className={
              isVisiblePaintings
                ? "animate__animated animate__slideInDown"
                : "animate__animated animate__slideOutUp"
            }
            style={{ textAlign: language ? "right" : "left" }}
          >
            {language ? "نقاشی‌" : "Paintings"}
          </h2>
        </VisibilitySensor>
        <Swiper
          className={classes.swiper}
          slidesPerView={generateSwipeCount()}
          spaceBetween={20}
          centeredSlides={true}
          mousewheel={true}
          loop={true}
          allowTouchMove={screenSize === "desktop" ? false : true}
          navigation={true}
          modules={[Navigation, Mousewheel]}
          onSlideChange={updateIndex}
        >
          {images.map((user, index) => (
            <SwiperSlide key={index}>
              <Image
                src={user}
                blurDataURL={user}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                as="image"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className={classes.swiperContainer}
        onClick={() => Router.push("/movies")}
      >
        <VisibilitySensor
          scrollDelay={250}
          onChange={(isVisible) => setIsVisibleMovies(isVisible)}
        >
          <h2
            className={
              isVisibleMovies
                ? "animate__animated animate__slideInDown"
                : "animate__animated animate__slideOutUp"
            }
            style={{ textAlign: language ? "right" : "left" }}
          >
            {language ? "فیلم" : "Movies"}
          </h2>
        </VisibilitySensor>
        <Swiper
          className={classes.swiper}
          slidesPerView={generateSwipeCount()}
          spaceBetween={20}
          centeredSlides={true}
          mousewheel={true}
          loop={true}
          allowTouchMove={screenSize === "desktop" ? false : true}
          navigation={true}
          modules={[Navigation, Mousewheel]}
          onSlideChange={updateIndex}
        >
          {images.map((user, index) => (
            <SwiperSlide key={index}>
              <Image
                src={user}
                blurDataURL={user}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                as="image"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className={classes.swiperContainer}
        onClick={() => Router.push("/travels")}
      >
        <VisibilitySensor
          scrollDelay={250}
          onChange={(isVisible) => setIsVisibleTravels(isVisible)}
        >
          <h2
            className={
              isVisibleTravels
                ? "animate__animated animate__slideInDown"
                : "animate__animated animate__slideOutUp"
            }
            style={{ textAlign: language ? "right" : "left" }}
          >
            {language ? "سفر" : "Travels"}
          </h2>
        </VisibilitySensor>
        <Swiper
          className={classes.swiper}
          slidesPerView={generateSwipeCount()}
          spaceBetween={20}
          centeredSlides={true}
          mousewheel={true}
          loop={true}
          allowTouchMove={screenSize === "desktop" ? false : true}
          navigation={true}
          modules={[Navigation, Mousewheel]}
          onSlideChange={updateIndex}
        >
          {images.map((user, index) => (
            <SwiperSlide key={index}>
              <Image
                src={user}
                blurDataURL={user}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                as="image"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
