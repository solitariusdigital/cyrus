import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";

export default function Travels() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);

  const works = [
    "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
    "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    "https://cyrus.storage.c2.liara.space/photos/8f11eb29-0da1-41da-8342-89f05eee3c3d.JPG",
  ];

  const navigationTypes = [
    {
      type: language ? "جهان گردی" : "World Travel",
      active: false,
    },
    {
      type: language ? "ایران گردی" : "Iran Travel",
      active: true,
    },
  ];

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (nav.link === "/travels") {
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

  return (
    <div className={classes.container}>
      <div
        className={classes.navigation}
        style={{
          width: screenSize === "desktop" ? "30%" : "60%",
        }}
      >
        {navigationTypes.map((nav, index) => (
          <p
            key={index}
            className={!nav.active ? classes.nav : classes.navActive}
          >
            {nav.type}
          </p>
        ))}
      </div>
      <div className={classes.gridBox}>
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
      </div>
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
