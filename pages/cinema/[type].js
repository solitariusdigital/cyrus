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
  const { cinemaTypes, setCinemaTypes } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [categoryWorks, setCategoryWorks] = useState([]);
  const [displayWorks, setDisplayWorks] = useState([]);
  const [initialIndex, setInitialIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("");

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

  useEffect(() => {
    setSelectedType(typeTitle);
    const categoryWorks = works.filter((work) => work.en.category === "Cinema");
    setCategoryWorks(categoryWorks);
    const displayWorks = categoryWorks.filter(
      (work) =>
        work.fa.subCategory === typeTitle || work.en.subCategory === typeTitle
    );
    let groupWorks = groupItemsByYear(displayWorks);
    setDisplayWorks(groupWorks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeTitle, works]);

  const changeFilterTypes = (type) => {
    setSelectedType(type);
    updateCategoryActive(type);
    const displayWorks = categoryWorks.filter(
      (work) => work.fa.subCategory === type || work.en.subCategory === type
    );
    let groupWorks = groupItemsByYear(displayWorks);
    setDisplayWorks(groupWorks);
  };

  const updateCategoryActive = (type) => {
    cinemaTypes.map((entry) => {
      if (entry.fa === type || entry.en === type) {
        entry.active = true;
      } else {
        entry.active = false;
      }
    });
    setCinemaTypes([...cinemaTypes]);
  };

  const groupItemsByYear = (items) => {
    return items.reduce((acc, item) => {
      const year = item[languageType].year;
      if (!acc[year]) {
        acc[year] = [];
      }
      const mediaWithData = item.media.map((media) => ({
        ...media,
        data: {
          fa: item.fa,
          en: item.en,
        },
        year: {
          fa: item.fa.year,
          en: item.en.year,
        },
      }));
      acc[year] = [...acc[year], ...mediaWithData];
      return acc;
    }, {});
  };

  const openGallerySlider = (entryIndex, year) => {
    changeFilterTypes(selectedType);
    setInitialIndex({
      entryIndex,
      year: language ? year.fa : year.en,
    });
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={classes.container}>
      <div
        className={
          language ? classes.typesNavigation : classes.typesNavigationReverse
        }
      >
        {cinemaTypes.map((type, index) => (
          <h3
            key={index}
            className={type.active ? classes.typeActive : classes.type}
            onClick={() => changeFilterTypes(type[languageType])}
          >
            {type[languageType]}
            {language && index !== 0 && (
              <span
                style={{
                  fontFamily: language ? "EnglishLight" : "EnglishLight",
                }}
              >
                |
              </span>
            )}
            {!language && index !== cinemaTypes.length - 1 && (
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
      {Object.entries(displayWorks)
        .map(([key, entries]) => (
          <div
            key={key}
            className={language ? classes.groupRow : classes.groupRowReverse}
          >
            <h3>
              {language
                ? toFarsiNumber(entries[0].year[languageType])
                : entries[0].year[languageType]}
            </h3>
            <div
              className={language ? classes.gridBox : classes.gridBoxReverse}
            >
              {entries.map((entry, entryIndex) => (
                <Fragment key={entryIndex}>
                  <div
                    className={classes.imageBox}
                    onClick={() =>
                      openGallerySlider(entryIndex, entries[0].year)
                    }
                  >
                    <Image
                      className={classes.image}
                      src={entry.link}
                      blurDataURL={entry.link}
                      placeholder="blur"
                      alt="cover"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </div>
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
