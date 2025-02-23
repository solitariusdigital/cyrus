/* eslint-disable react/display-name */
import { useState, useEffect, useContext, Fragment, memo } from "react";
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

export default function Type({ works, filterTypes, typeTitle }) {
  const { paintingTypes, setPaintingTypes } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [displayWorks, setDisplayWorks] = useState([]);
  const [initialIndex, setInitialIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [reqNumber, setReqNumber] = useState(1);
  const router = useRouter();

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
    // Set the selected type based on the current typeTitle
    setSelectedType(typeTitle);
    // Filter for display works based on the selected type
    const displayWorks = filterTypes.filter(
      (work) =>
        work.fa.subCategory === typeTitle || work.en.subCategory === typeTitle
    );
    // Group works by year and update displayWorks state
    const groupedWorks = groupItemsByYear(displayWorks);
    setDisplayWorks(groupedWorks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeTitle, works]);

  useEffect(() => {
    reqNumberTimer(500, 1);
    window.addEventListener("scroll", loadMore);
    return () => {
      window.removeEventListener("scroll", loadMore);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reqNumberTimer = (time, count) => {
    setTimeout(() => {
      setReqNumber((prev) => prev + count);
    }, time);
  };

  let debounceTimeout;
  const loadMore = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        setReqNumber((prev) => prev + 1);
      }
    }, 200);
  };

  const changeFilterTypes = (type) => {
    setSelectedType(type);
    updateCategoryActive(type);
    const displayWorks = filterTypes.filter(
      (work) => work.fa.subCategory === type || work.en.subCategory === type
    );
    let groupWorks = groupItemsByYear(displayWorks);
    setDisplayWorks(groupWorks);
    setReqNumber(0);
    reqNumberTimer(100, 2);
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

      // Initialize the array for the year if it doesn't exist
      if (!acc[year]) {
        acc[year] = [];
      }

      // Append media data to the corresponding year
      acc[year].push(...mediaWithData);
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

  const handleImageClick = (index, year) => {
    openGallerySlider(index, year);
  };

  // Memoized Image Component
  const MemoizedImage = memo(({ src, alt, onClick }) => (
    <Image
      className={classes.image}
      onClick={onClick}
      src={src}
      blurDataURL={src}
      placeholder="blur"
      alt={alt}
      layout="fill"
      objectFit="contain"
    />
  ));

  // Memoized Video Component
  const MemoizedVideo = memo(({ src, onClick }) => (
    <video
      className={classes.video}
      onClick={onClick}
      src={src + "#t=0.1"}
      playsInline
      preload="metadata"
    />
  ));

  // Memoized Entry Component
  const MemoizedEntry = memo(
    ({
      entry,
      entryIndex,
      entries,
      handleImageClick,
      deleteImage,
      permissionControl,
    }) => (
      <Fragment key={entryIndex}>
        <div className={classes.imageBox}>
          {entry.type === "image" ? (
            <MemoizedImage
              src={entry.link}
              alt={entry.data[languageType].subCategory}
              onClick={() => handleImageClick(entryIndex, entries[0].year)}
            />
          ) : (
            <MemoizedVideo
              src={entry.link}
              onClick={() => handleImageClick(entryIndex, entries[0].year)}
            />
          )}
          {permissionControl === "admin" && (
            <div className={classes.control}>
              <Tooltip title="Delete">
                <DeleteIcon
                  className="icon"
                  sx={{ color: "#d40d12" }}
                  onClick={() => deleteImage(entry.mediaIndex, entry.worksId)}
                />
              </Tooltip>
            </div>
          )}
        </div>
      </Fragment>
    )
  );

  return (
    <Fragment>
      <NextSeo
        title={typeTitle}
        description={language ? "هنرمند حرفه‌ای" : "Professional Artist"}
        canonical={`https://panteapaint.com/paintings/${replaceSpacesAndHyphens(
          typeTitle
        )}`}
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: `https://panteapaint.com/paintings/${replaceSpacesAndHyphens(
            typeTitle
          )}`,
          title: typeTitle,
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
        <div
          className={
            language ? classes.typesNavigation : classes.typesNavigationReverse
          }
        >
          {paintingTypes.map((type, index) => (
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
              {!language && index !== paintingTypes.length - 1 && (
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
          .reverse()
          .slice(0, reqNumber)
          .map(([key, entries]) => {
            if (!entries.length) return null;

            const firstEntry = entries[0];
            const yearDisplay = language
              ? toFarsiNumber(firstEntry.year[languageType])
              : firstEntry.year[languageType];

            return (
              <div
                key={key}
                className={
                  language ? classes.groupRow : classes.groupRowReverse
                }
              >
                {firstEntry && (
                  <h3 onClick={() => openGallerySlider(0, firstEntry.year)}>
                    {yearDisplay}
                  </h3>
                )}
                <div
                  className={
                    language ? classes.gridBox : classes.gridBoxReverse
                  }
                >
                  {entries.map((entry, entryIndex) => (
                    <MemoizedEntry
                      key={entryIndex}
                      entry={entry}
                      entryIndex={entryIndex}
                      entries={entries}
                      handleImageClick={handleImageClick}
                      deleteImage={deleteImage}
                      permissionControl={permissionControl}
                    />
                  ))}
                </div>
              </div>
            );
          })}
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
    const filterTypes = works.filter(
      (work) => work.en.category === "Paintings"
    );
    return {
      props: {
        works: JSON.parse(JSON.stringify(works)),
        filterTypes: JSON.parse(JSON.stringify(filterTypes)),
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
