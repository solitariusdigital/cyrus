import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import VisibilitySensor from "react-visibility-sensor";
import CoverSlider from "@/components/CoverSlider";

export default function Home() {
  const { language, setLanguage } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  let images = [
    "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
    "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    "https://cyrus.storage.c2.liara.space/photos/8f11eb29-0da1-41da-8342-89f05eee3c3d.JPG",
  ];

  let sliderHome = [
    {
      link: "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
      title: language ? "نقاشی‌" : "Paintings",
      route: "/paintings",
    },
    {
      link: "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
      title: language ? "سینما" : "Cinema",
      route: "/cinema",
    },
    {
      link: "https://cyrus.storage.c2.liara.space/photos/8f11eb29-0da1-41da-8342-89f05eee3c3d.JPG",
      title: language ? "سفر" : "Travels",
      route: "/travels",
    },
  ];

  useEffect(() => {
    if (document) {
      const newBackgroundColor = "#1e3638";
      const originalBackgroundColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = newBackgroundColor;
      return () => {
        document.body.style.backgroundColor = originalBackgroundColor;
      };
    }
  }, []);

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  const getNextIndex = (activeIndex) => {
    const nextIndex = (activeIndex + 1) % sliderHome.length;
    return nextIndex;
  };

  return (
    <div className={classes.container}>
      <section className={classes.cover}>
        <CoverSlider covers={images} />
      </section>
      <section className={classes.swiperContainer}>
        <div className={classes.swiperBox}>
          <VisibilitySensor
            scrollDelay={250}
            onChange={(isVisible) => setIsVisible(isVisible)}
          >
            <div className={classes.titleBox}>
              <h2
                className={
                  isVisible
                    ? "animate__animated animate__slideInDown"
                    : "animate__animated animate__slideOutUp"
                }
                style={{ textAlign: language ? "right" : "left" }}
                onClick={() => Router.push("/travels")}
              >
                {sliderHome[current].title}
              </h2>
              <h2
                className={
                  isVisible
                    ? "animate__animated animate__slideInDown"
                    : "animate__animated animate__slideOutUp"
                }
                style={{ textAlign: language ? "right" : "left" }}
                onClick={() => Router.push("/travels")}
              >
                {sliderHome[getNextIndex(current)].title}
              </h2>
            </div>
          </VisibilitySensor>
          <Swiper
            className={classes.swiper}
            slidesPerView={2}
            spaceBetween={0}
            mousewheel={true}
            loop={true}
            allowTouchMove={true}
            navigation={true}
            onSlideChange={updateIndex}
            modules={[Navigation, Mousewheel, EffectCreative]}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
          >
            {sliderHome.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  onClick={() => Router.push(image.route)}
                  src={image.link}
                  blurDataURL={image.link}
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
      </section>
    </div>
  );
}
