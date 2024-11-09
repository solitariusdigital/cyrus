import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Paintings() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [current, setCurrent] = useState(0);

  const works = [
    "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
    "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    "https://cyrus.storage.c2.liara.space/photos/8f11eb29-0da1-41da-8342-89f05eee3c3d.JPG",
    "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
    "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    "https://cyrus.storage.c2.liara.space/photos/8f11eb29-0da1-41da-8342-89f05eee3c3d.JPG",
  ];

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (nav.link === "/paintings") {
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gallerySlider = () => {
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  const generateSwipeCount = () => {
    let count = 0;
    switch (screenSize) {
      case "desktop":
        count = 7;
        break;
      case "tablet-landscape":
        count = 5;
        break;
      case "tablet-portrait":
        count = 3;
        break;
      case "mobile":
        count = 3;
        break;
    }
    return count;
  };

  return (
    <Fragment>
      <div className={classes.swiperContainer}>
        <Swiper
          className={classes.swiper}
          slidesPerView={generateSwipeCount()}
          spaceBetween={5}
          mousewheel={true}
          loop={true}
          allowTouchMove={true}
          navigation={true}
          onSlideChange={updateIndex}
          modules={[Navigation]}
        >
          {works.map((work, index) => (
            <SwiperSlide key={index}>
              <Image
                className={classes.image}
                onClick={() => gallerySlider()}
                src={work}
                blurDataURL={work}
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
      {displayGallerySlider && (
        <div className={classes.gallerySlider}>
          <div className={classes.icon}>
            <CloseIcon
              onClick={() => {
                setDisplayGallerySlider(false);
                document.body.style.overflow = "auto";
              }}
            />
          </div>
          <h2>works</h2>
          <GallerySlider media={works} />
        </div>
      )}
    </Fragment>
  );
}
