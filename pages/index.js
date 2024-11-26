import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import CoverSlider from "@/components/CoverSlider";

export default function Home() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

  const activateNav = (link, index) => {
    navigationTopBar.map((nav, i) => {
      if (i === index) {
        Router.push(link);
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
  };

  return (
    <div className={classes.container}>
      <section className={classes.cover}>
        <CoverSlider />
      </section>
      <section className={classes.imageBox}>
        <div className={classes.image}>
          <Image
            className={classes.image}
            src={"https://cyrus.storage.c2.liara.space/assets/IMG_2850.JPG"}
            blurDataURL={
              "https://cyrus.storage.c2.liara.space/assets/IMG_2850.JPG"
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
          {navigationTopBar
            .map((nav, index) => (
              <div
                key={index}
                className={classes.item}
                onClick={() => activateNav(nav.link, index)}
              >
                <h3>{nav.title[languageType]}</h3>
              </div>
            ))
            .slice(0, 3)}
        </div>
        <div className="fadeOverlay"></div>
      </section>
    </div>
  );
}
