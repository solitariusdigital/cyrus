import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";
import Router from "next/router";
import { replaceSpacesAndHyphens } from "@/services/utility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Paintings() {
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { paintingTypes, setPaintingTypes } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    setRerender(false);
    setTimeout(() => {
      setRerender(true);
    }, 50);
  }, [language]);

  useEffect(() => {
    navigationTopBar.map((nav, i) => {
      if (i === 0) {
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <NextSeo
        title={language ? "نقاشی‌" : "Paintings"}
        description={language ? "نقاش حرفه‌ای" : "Professional Painter"}
        canonical="https://panteapaint.com/paintings"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://panteapaint.com/paintings",
          title: language ? "نقاشی‌" : "Paintings",
          description: language ? "نقاش حرفه‌ای" : "Professional Painter",
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
            <h1>{language ? "نقاشی‌" : "Paintings"}</h1>
            {rerender && <div className={classes.border}></div>}
            {rerender && (
              <div className={classes.swiperContainer}>
                <Swiper
                  className={classes.swiper}
                  slidesPerView={3}
                  spaceBetween={10}
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
                          alt={type[languageType]}
                          layout="fill"
                          objectFit="cover"
                          as="image"
                          priority
                        />
                        <h3>{type[languageType]}</h3>
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
