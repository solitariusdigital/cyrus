import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import { replaceSpacesAndHyphens } from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Paintings() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { paintingTypes, setPaintingTypes } = useContext(StateContext);

  return (
    <div className={classes.container}>
      <section className={classes.coverBox}>
        <div className={classes.image}>
          <Image
            className={classes.image}
            src={"https://cyrus.storage.c2.liara.space/assets/IMG_2851.JPG"}
            blurDataURL={
              "https://cyrus.storage.c2.liara.space/assets/IMG_2851.JPG"
            }
            placeholder="blur"
            alt="image"
            layout="fill"
            objectFit="cover"
            as="image"
            priority
          />
        </div>
        <div
          className={language ? classes.items : classes.itemsReverse}
          style={{
            fontFamily: language ? "FarsiLight" : "EnglishLight",
          }}
        >
          <div className={classes.item}>
            <h1>{language ? "نقاشی‌" : "Paintings"}</h1>
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
                {paintingTypes.map((type, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={classes.imageBox}
                      onClick={() =>
                        Router.push(
                          `/paintings/${replaceSpacesAndHyphens(
                            type[languageType]
                          )}`
                        )
                      }
                    >
                      <Image
                        src={type.media}
                        blurDataURL={type.media}
                        placeholder="blur"
                        alt="type"
                        layout="fill"
                        objectFit="cover"
                        as="type"
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
          </div>
        </div>
      </section>
    </div>
  );
}
