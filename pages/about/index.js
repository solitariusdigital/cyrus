import { Fragment, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./about.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";

export default function About() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  return (
    <Fragment>
      <NextSeo
        title={language ? "درباره" : "About"}
        description={language ? "هنرمند حرفه‌ای" : "Professional Artist"}
        canonical="https://panteapaint.com/about"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://panteapaint.com/about",
          title: language ? "درباره" : "About",
          description: language ? "هنرمند حرفه‌ای" : "Professional Artist",
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
      <div className={classes.container}>
        <div className={classes.infoBox}>
          <h2
            style={{
              direction: language ? "rtl" : "ltr",
            }}
          >
            {language ? "درباره" : "About"}
          </h2>
          <div
            className={classes.information}
            style={{
              fontFamily: "English",
            }}
          >
            <div className={classes.items}>
              <h3>Pantea Cyrus</h3>
              <p>1974 Tehran, Iran</p>
            </div>
            <div className={classes.items}>
              <h3>Group Exhibitions</h3>
              <p>1998 Mojdeh Art Gallery, Tehran</p>
              <p>
                1999 The first annual charity exhibition for the benefit of
                handicapped girls, Tehran
              </p>
              <p>
                2000 Charity exhibition for the benefit of haemophilia children,
                Tehran
              </p>
              <p>
                2001 Persia, Iran-Australia Cultural Institute, Sydney-Melbourne
              </p>
              <p>2002 Niavaran Cultural Center, Tehran</p>
              <p>2004 Tehran Art Expo, Tehran</p>
              <p>2004 Golestan Art Gallery</p>
              <p>2007 Baran Art Gallery</p>
            </div>
            <div className={classes.items}>
              <h3>Solo Exhibitions</h3>
              <p>2005 Niavaran Art Gallery</p>
              <p>2006 Pasargad Art Gallery</p>
              <p>2008 Shirin Art Gallery</p>
              <p>2010 Shirin Art Gallery</p>
              <p>2012 Jorjani Art Gallery</p>
              <p>2016 26 Art Gallery</p>
            </div>
          </div>
        </div>
        <div className={classes.imageBox}>
          <div className={classes.image}>
            <Image
              className={classes.image}
              src={"https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG"}
              blurDataURL={
                "https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG"
              }
              placeholder="blur"
              alt="image"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
