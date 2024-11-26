import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Travels() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);

  const works = [
    "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
    "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    "https://cyrus.storage.c2.liara.space/photos/8f11eb29-0da1-41da-8342-89f05eee3c3d.JPG",
  ];

  const travelTypes = [
    {
      type: language ? "جهان گردی" : "World Travel",
      link: "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    },
    {
      type: language ? "ایران گردی" : "Iran Travel",
      link: "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    },
  ];

  const gallerySlider = () => {
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

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
            <h2>{language ? "سفر" : "Travels"}</h2>
            <div className={classes.swiperContainer}>
              <Swiper
                style={{ width: screenSize === "mobile" ? "100%" : "45%" }}
                className={classes.swiper}
                slidesPerView={2}
                spaceBetween={10}
              >
                {travelTypes.map((type, index) => (
                  <SwiperSlide key={index}>
                    <div className={classes.imageBox}>
                      <Image
                        src={type.link}
                        blurDataURL={type.link}
                        placeholder="blur"
                        alt="type"
                        layout="fill"
                        objectFit="cover"
                        as="type"
                        priority
                      />
                      <h3
                        style={{
                          fontSize:
                            screenSize === "mobile" && language
                              ? "0.8rem"
                              : "1.1rem",
                        }}
                      >
                        {type.type}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      {/* <div className={classes.gridBox}>
      {works.map((work, index) => (
        <div
          key={index}
          className={classes.imageBox}
          onClick={() => gallerySlider()}
        >
          <Image
            className={classes.image}
            src={work}
            blurDataURL={work}
            placeholder="blur"
            alt="cover"
            layout="fill"
            objectFit="cover"
            as="image"
            priority
          />
        </div>
      ))}
    </div> */}
      {displayGallerySlider && (
        <div className={classes.gallerySlider}>
          <div className={classes.icon}>
            <CloseIcon
              className="icon"
              onClick={() => {
                setDisplayGallerySlider(false);
                document.body.style.overflow = "auto";
              }}
            />
          </div>
          <GallerySlider media={works} />
        </div>
      )}
    </div>
  );
}
