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
  const { paintingTypes, setPaintingTypes } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);

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
    paintingTypes.map((type) => {
      if (type.fa === typeTitle || type.en === typeTitle) {
        type.active = true;
      } else {
        type.active = false;
      }
    });
    setPaintingTypes([...paintingTypes]);
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
        {paintingTypes.map((type, index) => (
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
