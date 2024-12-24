import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "../works.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";
import dbConnect from "@/services/dbConnect";
import worksModel from "@/models/Works";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { replaceSpacesAndHyphens, toFarsiNumber } from "@/services/utility";
import { updateWorksApi } from "@/services/api";

export default function Type({ works, typeTitle }) {
  const { cinemaTypes, setCinemaTypes } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [categoryWorks, setCategoryWorks] = useState([]);
  const [displayWorks, setDisplayWorks] = useState([]);
  const [initialIndex, setInitialIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const router = useRouter();

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
      const mediaWithData = item.media.map((media, index) => ({
        ...media,
        data: {
          fa: item.fa,
          en: item.en,
        },
        year: {
          fa: item.fa.year,
          en: item.en.year,
        },
        worksId: item.worksId,
        mediaIndex: index,
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

  const deleteImage = async (index, id) => {
    let confirmationMessage = "حذف عکس مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      let work = works.find((work) => work.worksId === id);
      work.media.splice(index, 1);
      await updateWorksApi(work);
      router.replace(router.asPath);
    }
  };

  const HeadingTag = screenSize === "mobile" ? "h4" : "h3";

  return (
    <Fragment>
      <NextSeo
        title={typeTitle}
        description={language ? "هنرپیشه سینما" : "Professional Actress"}
        canonical={`https://panteapaint.com/cinema/${replaceSpacesAndHyphens(
          typeTitle
        )}`}
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: `https://panteapaint.com/cinema/${replaceSpacesAndHyphens(
            typeTitle
          )}`,
          title: typeTitle,
          description: language ? "هنرپیشه سینما" : "Professional Actress",
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
        <div
          className={
            language ? classes.typesNavigation : classes.typesNavigationReverse
          }
        >
          {cinemaTypes.map((type, index) => (
            <HeadingTag
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
            </HeadingTag>
          ))}
        </div>
        {Object.entries(displayWorks)
          .map(([key, entries]) => (
            <div
              key={key}
              className={language ? classes.groupRow : classes.groupRowReverse}
            >
              {entries[0] && (
                <h3 onClick={() => openGallerySlider(0, entries[0].year)}>
                  {language
                    ? toFarsiNumber(entries[0].year[languageType])
                    : entries[0].year[languageType]}
                </h3>
              )}
              <div
                className={language ? classes.gridBox : classes.gridBoxReverse}
              >
                {entries.map((entry, entryIndex) => (
                  <Fragment key={entryIndex}>
                    <div className={classes.imageBox}>
                      {entry.type === "image" ? (
                        <Image
                          className={classes.image}
                          onClick={() =>
                            openGallerySlider(entryIndex, entries[0].year)
                          }
                          src={entry.link}
                          blurDataURL={entry.link}
                          placeholder="blur"
                          alt={entry.data[languageType].subCategory}
                          layout="fill"
                          objectFit="cover"
                          as="image"
                          priority
                        />
                      ) : (
                        <video
                          className={classes.video}
                          onClick={() =>
                            openGallerySlider(entryIndex, entries[0].year)
                          }
                          src={entry.link + "#t=0.1"}
                          playsInline
                          preload="metadata"
                        />
                      )}
                      {permissionControl === "admin" && (
                        <div className={classes.control}>
                          <Tooltip title="Delete">
                            <DeleteIcon
                              className="icon"
                              sx={{ color: "#d40d12" }}
                              onClick={() =>
                                deleteImage(entry.mediaIndex, entry.worksId)
                              }
                            />
                          </Tooltip>
                        </div>
                      )}
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
    </Fragment>
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
