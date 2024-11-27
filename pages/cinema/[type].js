import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";
import dbConnect from "@/services/dbConnect";
import worksModel from "@/models/Works";
import { replaceSpacesAndHyphens } from "@/services/utility";

export default function Type({ typeTitle }) {
  const { cinemaTypes, setCinemaTypes } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);

  const works = [
    "https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG",
    "https://cyrus.storage.c2.liara.space/assets/IMG_2854.JPG",
    "https://cyrus.storage.c2.liara.space/assets/IMG_2851.JPG",
  ];

  useEffect(() => {
    cinemaTypes.map((type) => {
      if (type.fa === typeTitle || type.en === typeTitle) {
        type.active = true;
      } else {
        type.active = false;
      }
    });
    setCinemaTypes([...cinemaTypes]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gallerySlider = () => {
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={classes.container}>
      <div className={classes.typesNavigation}>
        {cinemaTypes.map((type, index) => (
          <h3
            key={index}
            className={type.active ? classes.typeActive : classes.type}
            // onClick={() => setPageType(type)}
          >
            {type[languageType]}
            {index !== 0 && (
              <span
                style={{
                  fontFamily: language ? "EnglishLight" : "EnglishLight",
                }}
              >
                |
              </span>
            )}
          </h3>
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

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const works = await worksModel.find();
    return {
      props: {
        works: JSON.parse(JSON.stringify(works)),
        typeTitle: JSON.parse(
          JSON.stringify(replaceSpacesAndHyphens(context.query.type))
        ),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
