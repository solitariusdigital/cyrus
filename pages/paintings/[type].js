import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";
import dbConnect from "@/services/dbConnect";
import worksModel from "@/models/Works";
import { replaceSpacesAndHyphens, toFarsiNumber } from "@/services/utility";

export default function Type({ works, typeTitle }) {
  const { paintingTypes, setPaintingTypes } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [categoryWorks, setCategoryWorks] = useState([]);
  const [displayWorks, setDisplayWorks] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);

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

  useEffect(() => {
    const categoryWorks = works.filter(
      (work) => work.en.category === "Paintings"
    );
    setCategoryWorks(categoryWorks);
    const displayWorks = categoryWorks.filter(
      (work) =>
        work.fa.subCategory === typeTitle || work.en.subCategory === typeTitle
    );
    let groupWorks = groupItemsByYear(displayWorks);
    const sortWorks = Object.keys(groupWorks)
      .sort((a, b) => a - b)
      .map((year) => groupWorks[year]);
    setDisplayWorks(sortWorks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeTitle, works]);

  const changeFilterTypes = (type) => {
    updateCategoryActive(type);
    const displayWorks = categoryWorks.filter(
      (work) => work.fa.subCategory === type || work.en.subCategory === type
    );
    let groupWorks = groupItemsByYear(displayWorks);
    const sortWorks = Object.keys(groupWorks)
      .sort((a, b) => a - b)
      .map((year) => groupWorks[year]);
    setDisplayWorks(sortWorks);
  };

  const updateCategoryActive = (type) => {
    paintingTypes.map((entry) => {
      if (entry.fa === type || entry.en === type) {
        entry.active = true;
      } else {
        entry.active = false;
      }
    });
    setPaintingTypes([...paintingTypes]);
  };

  const groupItemsByYear = (items) => {
    return items.reduce((acc, item) => {
      const year = item[languageType].year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});
  };

  const gallerySlider = (mediaIndex) => {
    setInitialIndex(mediaIndex);
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
            onClick={() => changeFilterTypes(type[languageType])}
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
      {displayWorks
        .map((work, workIndex) => (
          <div
            className={language ? classes.groupRow : classes.groupRowReverse}
            key={workIndex}
          >
            <h3>
              {language
                ? toFarsiNumber(work[workIndex][languageType].year)
                : work[workIndex][languageType].year}
            </h3>
            <div
              className={language ? classes.gridBox : classes.gridBoxReverse}
            >
              {work.map((entry, entryIndex) => (
                <Fragment key={entryIndex}>
                  {entry.media.map((media, mediaIndex) => (
                    <div
                      key={mediaIndex}
                      className={classes.imageBox}
                      onClick={() => gallerySlider(mediaIndex)}
                    >
                      <Image
                        className={classes.image}
                        src={media.link}
                        blurDataURL={media.link}
                        placeholder="blur"
                        alt="cover"
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        ))
        .reverse()}
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
          <GallerySlider
            displayWorks={displayWorks}
            initialIndex={initialIndex}
          />
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
