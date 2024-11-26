import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import secureLocalStorage from "react-secure-storage";
import loaderImage from "@/assets/loader.png";
import {
  fourGenerator,
  sixGenerator,
  uploadMedia,
  extractParagraphs,
  areAllStatesValid,
} from "@/services/utility";
import { createWorksApi, updateWorksApi } from "@/services/api";

export default function Works({ worksData }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [category, setCategory] = useState({ en: "Paintings", fa: "نقاشی‌" });
  const [subCategory, setSubCategory] = useState({ en: "", fa: "" });
  const [location, setLocation] = useState({ en: "", fa: "" });
  const [description, setDescription] = useState({ en: "", fa: "" });
  const [size, setSize] = useState({ en: "", fa: "" });
  const [year, setYear] = useState({ en: "", fa: "" });

  const [imagesPreview, setImagesPreview] = useState([]);
  const [videosPreview, setVideosPreview] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [uploadVideos, setUploadVideos] = useState([]);

  const [disableButton, setDisableButton] = useState(false);
  const [editWorksData, setEditWorksData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState("");

  const sourceLink = "https://cyrus.storage.c2.liara.space";
  const router = useRouter();

  const categories = {
    نقاشی‌: {
      fa: "نقاشی‌",
      en: "Paintings",
    },
    سینما: {
      fa: "سینما",
      en: "Cinema",
    },
    سفر: {
      fa: "سفر",
      en: "Travels",
    },
  };
  const subCategories = {
    نقاشی‌: ["رنگ روغن", "اکریلیک", "آبرنگ"],
    سینما: ["سینما", "تئاتر", "سریال", "فیلم کوتاه", "جشنواره", "جوایز"],
    سفر: ["ایران گردی", "جهان گردی"],
  };
  const englishSubCategoreis = {
    اکریلیک: "Acrylic",
    اکریلیک: "Oil Color",
    آبرنگ: "Watercolor",
    سینما: "Cinema",
    تئاتر: "Theatre",
    سریال: "Series",
    "فیلم کوتاه": "Short Film",
    جشنواره: "Festival",
    جوایز: "Awards",
    "ایران گردی": "Iran Tour",
    "جهان گردی": "World Tour",
  };

  const handleImageChange = (event) => {
    const array = Array.from(event.target.files);
    setUploadImages(array);
    setImagesPreview(
      array.map((item) => ({
        file: item,
        link: URL.createObjectURL(item),
      }))
    );
  };
  const handleVideoChange = (event) => {
    const array = Array.from(event.target.files);
    setUploadVideos(array);
    setVideosPreview(
      array.map((item) => ({
        file: item,
        link: URL.createObjectURL(item),
      }))
    );
  };
  const removeImageInputFile = () => {
    const input = document.getElementById("inputImage");
    input.value = null;
  };
  const removeVideoInputFile = () => {
    const input = document.getElementById("inputVideo");
    input.value = null;
  };

  const handleSubmit = async () => {
    const isValid = areAllStatesValid([category, subCategory]);
    if (!isValid) {
      showAlert("دسته‌ و زیر مجموعه الزامیست");
      return;
    }
    if (
      !editWorksData &&
      imagesPreview.length === 0 &&
      videosPreview.length === 0
    ) {
      showAlert("انتخاب عکس یا ویدئو الزامیست");
      return;
    }

    setDisableButton(true);
    setLoader(true);

    let mediaLinks = editWorksData ? editWorksData.media : [];
    const mediaFolder = "works";
    const worksId = editWorksData
      ? editWorksData.worksId
      : `wor${sixGenerator()}`;

    if (imagesPreview.length > 0) {
      const imageFormat = ".jpg";
      for (const media of uploadImages) {
        const mediaId = `img${fourGenerator()}`;
        const mediaLink = `${sourceLink}/${mediaFolder}/${worksId}/${mediaId}${imageFormat}`;
        await uploadMedia(media, mediaId, mediaFolder, worksId, imageFormat);
        mediaLinks.push({
          link: mediaLink,
          type: "image",
          active: true,
        });
      }
    }

    if (videosPreview.length > 0) {
      const videoFormat = ".mp4";
      for (const media of uploadVideos) {
        const mediaId = `vid${fourGenerator()}`;
        const mediaLink = `${sourceLink}/${mediaFolder}/${worksId}/${mediaId}${videoFormat}`;
        await uploadMedia(media, mediaId, mediaFolder, worksId, videoFormat);
        mediaLinks.push({
          link: mediaLink,
          type: "video",
          active: true,
        });
      }
    }

    const worksObject = {
      fa: {
        title: title.fa,
        category: category.fa,
        subCategory: subCategory.fa,
        location: location.fa,
        description: extractParagraphs(description.fa).join("\n\n"),
        size: size.fa,
        year: year.fa,
      },
      en: {
        title: title.en,
        category: category.en,
        subCategory: subCategory.en,
        location: location.en,
        description: extractParagraphs(description.en).join("\n\n"),
        size: size.en,
        year: year.en,
      },
      media: mediaLinks,
      active: false,
      worksId: worksId,
    };

    if (editWorksData) {
      worksObject.id = editWorksData["_id"];
      await updateWorksApi(worksObject);
    } else {
      await createWorksApi(worksObject);
    }
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const selectWorks = (index) => {
    setEditWorksData(worksData[index]);
    setTitle({
      fa: worksData[index].fa.title,
      en: worksData[index].en.title,
    });
    setCategory({
      fa: worksData[index].fa.category,
      en: worksData[index].en.category,
    });
    setSubCategory({
      fa: worksData[index].fa.subCategory,
      en: worksData[index].en.subCategory,
    });
    setLocation({
      fa: worksData[index].fa.location,
      en: worksData[index].en.location,
    });
    setDescription({
      fa: worksData[index].fa.description,
      en: worksData[index].en.description,
    });
    setSize({
      fa: worksData[index].fa.size,
      en: worksData[index].en.size,
    });
    setYear({
      fa: worksData[index].fa.year,
      en: worksData[index].en.year,
    });
  };

  const logOut = () => {
    window.location.assign("/");
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className={classes.form}>
        <div className={classes.formBox}>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>برای ویرایش انتخاب کنید</p>
              <CloseIcon
                className="icon"
                onClick={() => {
                  router.reload(router.asPath);
                }}
                sx={{ fontSize: 16 }}
              />
            </div>
            <select
              style={{
                fontFamily: "Farsi",
              }}
              defaultValue={"default"}
              onChange={(e) => {
                selectWorks(e.target.value);
              }}
            >
              <option value="default" disabled>
                انتخاب اثر
              </option>
              {worksData.map((works, index) => {
                return (
                  <option key={index} value={index}>
                    {works["fa"].title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={classes.formBox}>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                زیر مجموعه
              </p>
            </div>
            <select
              style={{
                fontFamily: "Farsi",
              }}
              defaultValue={"default"}
              onChange={(e) =>
                setSubCategory({
                  fa: [e.target.value][0],
                  en: englishSubCategoreis[e.target.value],
                })
              }
            >
              <option value="default" disabled>
                {editWorksData
                  ? editWorksData.fa.subCategory
                  : "انتخاب زیر مجموعه"}
              </option>
              {subCategories[category["fa"]].map((subCat, index) => (
                <option key={index} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.input}>
            <div className={classes.barReverse}>
              <p className={classes.label}>
                <span>*</span>
                دسته
              </p>
            </div>
            <select
              style={{
                fontFamily: "Farsi",
              }}
              defaultValue={"default"}
              onChange={(e) =>
                setCategory({
                  fa: categories[e.target.value].fa,
                  en: categories[e.target.value].en,
                })
              }
            >
              <option value="default" disabled>
                {editWorksData ? editWorksData.fa.category : "انتخاب دسته"}
              </option>
              {Object.keys(categories).map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={classes.formBox}>
          <div
            style={{
              fontFamily: "English",
            }}
          >
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>Title</p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setTitle((prevData) => ({
                      ...prevData,
                      en: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                type="text"
                id="titleEn"
                name="title"
                onChange={(e) =>
                  setTitle((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={title.en}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>Location</p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setLocation((prevData) => ({
                      ...prevData,
                      en: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                type="text"
                id="locationEn"
                name="location"
                onChange={(e) =>
                  setLocation((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={location.en}
                autoComplete="off"
              ></input>
            </div>
            {category.en === "Paintings" && (
              <div className={classes.input}>
                <div className={classes.bar}>
                  <p className={classes.label}>Size</p>
                  <CloseIcon
                    className="icon"
                    onClick={() =>
                      setSize((prevData) => ({
                        ...prevData,
                        en: "",
                      }))
                    }
                    sx={{ fontSize: 16 }}
                  />
                </div>
                <input
                  style={{
                    fontFamily: "English",
                  }}
                  type="text"
                  id="sizeEn"
                  name="size"
                  onChange={(e) =>
                    setSize((prevData) => ({
                      ...prevData,
                      en: e.target.value,
                    }))
                  }
                  value={size.en}
                  autoComplete="off"
                ></input>
              </div>
            )}
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>Year</p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setYear((prevData) => ({
                      ...prevData,
                      en: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "English",
                }}
                type="phone"
                id="yearEn"
                name="year"
                onChange={(e) =>
                  setYear((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={year.en}
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>Description</p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setDescription((prevData) => ({
                      ...prevData,
                      en: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <textarea
                style={{
                  fontFamily: "English",
                }}
                type="text"
                id="descriptionEn"
                name="description"
                onChange={(e) =>
                  setDescription((prevData) => ({
                    ...prevData,
                    en: e.target.value,
                  }))
                }
                value={description.en}
                autoComplete="off"
              ></textarea>
            </div>
          </div>
          <div
            style={{
              fontFamily: "Farsi",
            }}
          >
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>عنوان</p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setTitle((prevData) => ({
                      ...prevData,
                      fa: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                }}
                type="text"
                id="titleFa"
                name="title"
                onChange={(e) =>
                  setTitle((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={title.fa}
                dir="rtl"
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>مکان</p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setLocation((prevData) => ({
                      ...prevData,
                      fa: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                }}
                type="text"
                id="locationFa"
                name="location"
                onChange={(e) =>
                  setLocation((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={location.fa}
                dir="rtl"
                autoComplete="off"
              ></input>
            </div>
            {category.fa === "نقاشی‌" && (
              <div className={classes.input}>
                <div className={classes.barReverse}>
                  <p className={classes.label}>اندازه</p>
                  <CloseIcon
                    className="icon"
                    onClick={() =>
                      setSize((prevData) => ({
                        ...prevData,
                        fa: "",
                      }))
                    }
                    sx={{ fontSize: 16 }}
                  />
                </div>
                <input
                  style={{
                    fontFamily: "Farsi",
                  }}
                  type="text"
                  id="sizeFa"
                  name="size"
                  onChange={(e) =>
                    setSize((prevData) => ({
                      ...prevData,
                      fa: e.target.value,
                    }))
                  }
                  value={size.fa}
                  dir="rtl"
                  autoComplete="off"
                ></input>
              </div>
            )}
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>سال</p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setYear((prevData) => ({
                      ...prevData,
                      fa: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                style={{
                  fontFamily: "Farsi",
                }}
                type="phone"
                id="yearFa"
                name="year"
                onChange={(e) =>
                  setYear((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={year.fa}
                dir="rtl"
                autoComplete="off"
              ></input>
            </div>
            <div className={classes.input}>
              <div className={classes.barReverse}>
                <p className={classes.label}>توضیحات</p>
                <CloseIcon
                  className="icon"
                  onClick={() =>
                    setDescription((prevData) => ({
                      ...prevData,
                      fa: "",
                    }))
                  }
                  sx={{ fontSize: 16 }}
                />
              </div>
              <textarea
                style={{
                  fontFamily: "Farsi",
                }}
                type="text"
                id="descriptionFa"
                name="description"
                onChange={(e) =>
                  setDescription((prevData) => ({
                    ...prevData,
                    fa: e.target.value,
                  }))
                }
                value={description.fa}
                dir="rtl"
                autoComplete="off"
              ></textarea>
            </div>
          </div>
        </div>
        <div
          className={classes.formAction}
          style={{
            fontFamily: "Farsi",
          }}
        >
          <div className={classes.mediaContainer}>
            <div className={classes.media}>
              <label className="file">
                <input
                  onChange={handleImageChange}
                  id="inputImage"
                  type="file"
                  accept="image/*"
                  multiple
                />
                <p>عکس</p>
              </label>
              <CloseIcon
                className={classes.clearMedia}
                onClick={() => {
                  setImagesPreview([]);
                  removeImageInputFile();
                }}
                sx={{ fontSize: 16 }}
              />
              <div className={classes.preview}>
                {imagesPreview.map((image, index) => (
                  <Image
                    key={index}
                    width={300}
                    height={200}
                    objectFit="contain"
                    src={image.link}
                    alt="image"
                    priority
                  />
                ))}
              </div>
            </div>
            <div className={classes.media}>
              <label className="file">
                <input
                  onChange={handleVideoChange}
                  id="inputVideo"
                  type="file"
                  accept="video/*"
                  multiple
                />
                <p>ویدئو</p>
              </label>
              <CloseIcon
                className={classes.clearMedia}
                onClick={() => {
                  setVideosPreview([]);
                  removeVideoInputFile();
                }}
                sx={{ fontSize: 16 }}
              />
              <div className={classes.preview}>
                {videosPreview.map((video, index) => (
                  <video
                    key={index}
                    className={classes.video}
                    src={video.link + "#t=0.1"}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={classes.alert}>{alert}</p>
          {loader && (
            <div>
              <Image width={50} height={50} src={loaderImage} alt="isLoading" />
            </div>
          )}
          <button
            style={{
              fontFamily: "Farsi",
            }}
            disabled={disableButton}
            onClick={() => handleSubmit()}
          >
            {editWorksData ? "ویرایش داده" : "ذخیره داده"}
          </button>
          <div className={classes.logout} onClick={() => logOut()}>
            <p>خروج از پورتال</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
