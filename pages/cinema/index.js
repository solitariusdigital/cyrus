import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { replaceSpacesAndHyphens } from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Movies() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { cinemaTypes, setCinemaTypes } = useContext(StateContext);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    setRerender(false);
    setTimeout(() => {
      setRerender(true);
    }, 50);
  }, [language]);

  return (
    <section className={classes.container}>
      <Image
        src={"https://cyrus.storage.c2.liara.space/assets/IMG_2851.JPG"}
        blurDataURL={"https://cyrus.storage.c2.liara.space/assets/IMG_2851.JPG"}
        placeholder="empty"
        alt="image"
        layout="fill"
        objectFit="cover"
        as="image"
        priority
      />
      <div
        className={language ? classes.items : classes.itemsReverse}
        style={{
          fontFamily: language ? "FarsiLight" : "EnglishLight",
        }}
      >
        <div className={classes.item}>
          <h1>{language ? "سینما" : "Cinema"}</h1>
          {rerender && (
            <div className={classes.swiperContainer}>
              <Swiper
                className={classes.swiper}
                slidesPerView={3}
                spaceBetween={screenSize === "mobile" ? 10 : 20}
                centeredSlides={true}
                mousewheel={true}
                loop={true}
                allowTouchMove={true}
                navigation={true}
                modules={[Navigation, Mousewheel]}
              >
                {cinemaTypes.map((type, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={classes.imageBox}
                      onClick={() =>
                        Router.push(
                          `/cinema/${replaceSpacesAndHyphens(
                            type[languageType]
                          )}`
                        )
                      }
                    >
                      <Image
                        src={type.media}
                        blurDataURL={type.media}
                        placeholder="blur"
                        alt={type[languageType]}
                        layout="fill"
                        objectFit="cover"
                        as="image"
                        priority
                      />
                      <h2
                        style={{
                          fontSize:
                            screenSize === "mobile" && language
                              ? "1.2rem"
                              : "1.3rem",
                        }}
                      >
                        {type[languageType]}
                      </h2>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
