import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";
import Router from "next/router";
import { replaceSpacesAndHyphens } from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function Travels() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { travelTypes, setTravelTypes } = useContext(StateContext);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    setRerender(false);
    setTimeout(() => {
      setRerender(true);
    }, 50);
  }, [language]);

  return (
    <Fragment>
      <NextSeo
        title={language ? "سفر" : "Travels"}
        description={language ? "ماجراجو حرفه‌ای" : "Professional Adventurer"}
        canonical="https://panteapaint.com/travels"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://panteapaint.com/travels",
          title: language ? "سفر" : "Travels",
          description: language ? "ماجراجو حرفه‌ای" : "Professional Adventurer",
          siteName: language ? "پان ته آ سیروس" : "Pantea Cyrus",
          images: {
            url: logoIcon,
            width: 1200,
            height: 630,
            alt: language ? "پان ته آ سیروس" : "Pantea Cyrus",
          },
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
      />
      <section className={classes.container}>
        <Image
          src={"https://cyrus.storage.c2.liara.space/assets/IMG_2851.JPG"}
          blurDataURL={
            "https://cyrus.storage.c2.liara.space/assets/IMG_2851.JPG"
          }
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
            <h1>{language ? "سفر" : "Travels"}</h1>
            <div className={classes.border}></div>
            {rerender && (
              <div className={classes.swiperContainer}>
                <Swiper
                  style={{ width: screenSize === "mobile" ? "100%" : "100%" }}
                  className={classes.swiper}
                  slidesPerView={2}
                  spaceBetween={10}
                >
                  {travelTypes.map((type, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={classes.imageBox}
                        onClick={() =>
                          Router.push(
                            `/travels/${replaceSpacesAndHyphens(
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
    </Fragment>
  );
}
