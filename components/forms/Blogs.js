import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { extractParagraphs } from "@/services/utility";
import { createBlogsApi, updateBlogsApi } from "@/services/api";

export default function Blogs({ blogsData }) {
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [description, setDescription] = useState({ en: "", fa: "" });
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const [editBlog, setEditBlog] = useState(false);
  const [editBlogData, setEditBlogData] = useState(null);
  const router = useRouter();

  const createBlog = async () => {
    if (!title.fa && !description.fa) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }

    setDisableButton(true);

    const blogObject = {
      fa: {
        title: title.fa.trim(),
        description: extractParagraphs(description.fa).join("\n\n"),
      },
      en: {
        title: title.en.trim(),
        description: extractParagraphs(description.en).join("\n\n"),
      },
      active: false,
    };
    await createBlogsApi(blogObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const updateBlog = async () => {
    if (!title.fa && !description.fa) {
      showAlert("موارد ستاره‌دار الزامیست");
      return;
    }

    setDisableButton(true);

    const blogObject = {
      ...editBlogData,
      fa: {
        title: title.fa.trim(),
        description: extractParagraphs(description.fa).join("\n\n"),
      },
      en: {
        title: title.en.trim(),
        description: extractParagraphs(description.en).join("\n\n"),
      },
      active: true,
    };
    await updateBlogsApi(blogObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const selectBlog = (index) => {
    setEditBlog(true);
    setEditBlogData(blogsData[index]);
    setTitle({
      fa: blogsData[index].fa.title,
      en: blogsData[index].en.title,
    });
    setDescription({
      fa: blogsData[index].fa.description,
      en: blogsData[index].en.description,
    });
  };

  return (
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
              selectBlog(e.target.value);
            }}
          >
            <option value="default" disabled>
              انتخاب وبلاگ
            </option>
            {blogsData.map((blogs, index) => {
              return (
                <option key={index} value={index}>
                  {blogs["fa"].title}
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
              <p className={classes.label}>
                <span>*</span>
                عنوان
              </p>
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
              <p className={classes.label}>
                <span>*</span>
                توضیحات
              </p>
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
        <p className={classes.alert}>{alert}</p>
        <button
          style={{
            fontFamily: "Farsi",
          }}
          disabled={disableButton}
          onClick={() => (editBlog ? updateBlog() : createBlog())}
        >
          {editBlog ? "ویرایش داده" : "ذخیره داده"}
        </button>
      </div>
    </div>
  );
}
