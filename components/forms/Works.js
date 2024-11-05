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
} from "@/services/utility";
import { createWorksApi, updateWorksApi } from "@/services/api";

export default function Works() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [category, setCategory] = useState({ en: "", fa: "" });
  const [location, setLocation] = useState({ en: "", fa: "" });
  const [description, setDescription] = useState({ en: "", fa: "" });
  const [size, setSize] = useState({ en: "", fa: "" });
  const [year, setYear] = useState({ en: "", fa: "" });
  const [newMedia, setNewMedia] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [videosPreview, setVideosPreview] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [uploadVideos, setUploadVideos] = useState([]);

  const [editMedia, setEditMedia] = useState("");
  const [isMediaChanging, setIsMediaChanging] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [editCompany, setEditCompany] = useState(false);
  const [editCompanyData, setEditCompanyData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState("");

  const categories = ["نقاشی‌", "فیلم", "سفر"];
  const sourceLink = "https://kimpur.storage.c2.liara.space";
  const router = useRouter();

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

  const createWorks = async () => {
    if (!category) {
      showAlert("دسته‌بندی الزامیست");
      return;
    }
    if (imagesPreview.length === 0 && videosPreview.length === 0) {
      showAlert("انتخاب عکس یا ویدئو");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    let mediaLinks = [];
    const mediaFolder = "works";
    const worksId = `wor${sixGenerator()}`;

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
        setProgress((prevProgress) => prevProgress + progressIncrement);
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
        setProgress((prevProgress) => prevProgress + progressIncrement);
      }
    }

    const worksObject = {
      title: title.trim(),
      category: category.trim(),
      location: location.trim(),
      description: extractParagraphs(description).join("\n\n"),
      size: size.trim(),
      year: year.trim(),
      media: mediaLink,
      active: false,
    };

    await createWorksApi(worksObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const updateWorks = async () => {
    if (!title || !location || !size || !year || !description) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    let mediaLink;
    if (isMediaChanging) {
      let mediaFormat = ".jpg";
      let mediaFolder = "company";
      const subFolder = `com${sixGenerator()}`;
      let mediaId = `img${fourGenerator()}`;
      mediaLink = `${sourceLink}/${mediaFolder}/${subFolder}/${mediaId}${mediaFormat}`;
      await uploadMedia(newMedia, mediaId, mediaFolder, subFolder, mediaFormat);
    } else {
      mediaLink = editMedia;
    }

    const companyObject = {
      ...editCompanyData,
      title: title.trim(),
      location: location.trim(),
      size: size.trim(),
      year: year.trim(),
      description: extractParagraphs(description).join("\n\n"),
      media: mediaLink,
    };

    await updateWorksApi(companyObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const selectCompany = (index) => {
    setEditCompany(true);
    setEditCompanyData(companyData[index]);
    setTitle(companyData[index].title);
    setLocation(companyData[index].location);
    setSize(companyData[index].size);
    setYear(companyData[index].year);
    setDescription(companyData[index].description);
    setEditMedia(companyData[index].media);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const logOut = () => {
    window.location.assign("/");
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className={classes.form}>
        <div className={classes.input}>
          <div className={classes.barReverse}>
            <p className={classes.label}>
              <span>*</span>
              دسته‌بندی
            </p>
          </div>
          <select
            defaultValue={"default"}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="default" disabled>
              انتخاب
            </option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className={classes.formBox}
          style={{
            fontFamily: "English",
          }}
        >
          <div>
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
                id="title"
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
                id="location"
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
                type="phone"
                id="size"
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
                type="text"
                id="year"
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
                id="description"
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
          <div>
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
                id="title"
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
                id="location"
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
                type="phone"
                id="size"
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
                type="text"
                id="year"
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
                id="description"
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
            disabled={disableButton}
            onClick={() => (editCompany ? updateWorks() : createWorks())}
          >
            {editCompany ? "ویرایش داده" : "ذخیره داده"}
          </button>
          <div className={classes.logout} onClick={() => logOut()}>
            <p>خروج از پورتال</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
