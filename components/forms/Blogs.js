import { useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { extractParagraphs, areAllStatesValid } from "@/services/utility";
import { createBlogsApi } from "@/services/api";

export default function Blogs() {
  const [title, setTitle] = useState({ en: "", fa: "" });
  const [description, setDescription] = useState({ en: "", fa: "" });
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");
  const router = useRouter();

  const createBlogs = async () => {
    const isValid = areAllStatesValid([title, description]);
    if (!isValid) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setDisableButton(true);

    const worksObject = {
      fa: {
        title: title.fa,
        description: extractParagraphs(description.fa).join("\n\n"),
      },
      en: {
        title: title.en,
        description: extractParagraphs(description.en).join("\n\n"),
      },
      active: false,
    };

    await createBlogsApi(worksObject);
    showAlert("ذخیره شد");
    router.reload(router.asPath);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div className={classes.form}>
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
        <p className={classes.alert}>{alert}</p>
        <button
          style={{
            fontFamily: "Farsi",
          }}
          disabled={disableButton}
          onClick={() => createBlogs()}
        >
          ذخیره داده
        </button>
      </div>
    </div>
  );
}
