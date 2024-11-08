import { useState, useEffect, useContext, Fragment, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import VisibilitySensor from "react-visibility-sensor";
import CoverSlider from "@/components/CoverSlider";
import logo from "@/assets/logo.png";

export default function Home() {
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const [isVisiblePaintings, setIsVisiblePaintings] = useState(false);
  const [isVisibleMovies, setIsVisibleMovies] = useState(false);
  const [isVisibleTravels, setIsVisibleTravels] = useState(false);

  let images = [
    "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
    "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    "https://cyrus.storage.c2.liara.space/photos/8f11eb29-0da1-41da-8342-89f05eee3c3d.JPG",
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
      <section className={classes.cover}>
        <CoverSlider covers={images} />
      </section>
      <div className={classes.swiperContainer}>
        <div className={classes.swiperBox}>
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
              onClick={() => Router.push("/paintings")}
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
            allowTouchMove={true}
            navigation={true}
            modules={[Navigation]}
            onSlideChange={updateIndex}
          >
            {images.map((user, index) => (
              <SwiperSlide key={index}>
                <Image
                  onClick={() => Router.push("/paintings")}
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
        <div className={classes.logo}>
          <Image
            width={40}
            height={400}
            src={logo}
            alt="logo"
            as="image"
            priority
          />
        </div>
      </div>
      <div className={classes.swiperContainer}>
        <div className={classes.swiperBox}>
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
              onClick={() => Router.push("/movies")}
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
            allowTouchMove={true}
            navigation={true}
            modules={[Navigation]}
            onSlideChange={updateIndex}
          >
            {images.map((user, index) => (
              <SwiperSlide key={index}>
                <Image
                  onClick={() => Router.push("/movies")}
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
        <div className={classes.logo}>
          <Image
            width={40}
            height={400}
            src={logo}
            alt="logo"
            as="image"
            priority
          />
        </div>
      </div>
      <div className={classes.swiperContainer}>
        <div className={classes.swiperBox}>
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
              onClick={() => Router.push("/travels")}
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
            allowTouchMove={true}
            navigation={true}
            modules={[Navigation]}
            onSlideChange={updateIndex}
          >
            {images.map((user, index) => (
              <SwiperSlide key={index}>
                <Image
                  onClick={() => Router.push("/travels")}
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
        <div className={classes.logo}>
          <Image
            width={40}
            height={400}
            src={logo}
            alt="logo"
            as="image"
            priority
          />
        </div>
      </div>
    </div>
  );
}
