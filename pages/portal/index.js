import { useState, useContext, useEffect, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./portal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import secureLocalStorage from "react-secure-storage";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import { createUserApi, getUsersApi } from "@/services/api";
import { validateEmail } from "@/services/utility";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";

export default function Portal() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [formType, setFormType] = useState(true);

  useEffect(() => {
    if (permissionControl === "admin") {
      Router.push("/admin");
    }
  }, [permissionControl]);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleLogin = () => {
    if (!email || !password) {
      showAlert("ایمیل و پسورد الزامیست");
      return;
    }
    if (!validateEmail(email)) {
      showAlert("ایمیل اشتباه");
      return;
    }
    if (password.length < 8) {
      showAlert("پسورد باید حداقل 8 کاراکتر باشد");
      return;
    }

    if (formType) {
      signinUser();
    } else {
      signupUser();
    }
  };

  // signin existing user
  const signinUser = async () => {
    const users = await getUsersApi();
    const userData = users.find((user) => user.email === email);
    if (userData) {
      if (decryptPassword(userData.password) === password) {
        setCurrentUser(userData);
        secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
        if (userData.permission === "admin") {
          window.location.assign("/admin");
        } else {
          window.location.assign("/");
        }
      } else {
        showAlert("پسورد اشتباه");
      }
    } else {
      showAlert("ایمیل وجود ندارد");
    }
  };

  // signup new user into db/state/localstorage
  const signupUser = async () => {
    const user = {
      name: "",
      email: email.trim(),
      password: cryptPassword(),
      permission: "user",
    };
    try {
      const userData = await createUserApi(user);
      if (userData.hasOwnProperty("error")) {
        showAlert("خطا در برقراری ارتباط");
      } else {
        setCurrentUser(userData);
        secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
        window.location.assign("/");
      }
    } catch (error) {
      showAlert("خطا در برقراری ارتباط");
    }
  };

  // encrypt password
  const cryptPassword = () => {
    return AES.encrypt(
      password.trim(),
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    ).toString();
  };

  // dencrypt password
  const decryptPassword = (password) => {
    let decryptedBytes = AES.decrypt(
      password,
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    );
    return decryptedBytes.toString(enc.Utf8);
  };

  return (
    <Fragment>
      <NextSeo
        title={language ? "پورتال" : "Portal"}
        description={language ? "هنرمند حرفه‌ای" : "Professional Artist"}
        canonical="https://panteapaint.com/portal"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://panteapaint.com/portal",
          title: language ? "پورتال" : "Portal",
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
      <div
        className={classes.container}
        style={{
          fontFamily: "Farsi",
        }}
      >
        <h2>پورتال</h2>
        <div className={classes.form}>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>ایمیل</p>
              <CloseIcon
                className="icon"
                onClick={() => setEmail("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
            />
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>پسورد</p>
              <CloseIcon
                className="icon"
                onClick={() => setPassword("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              style={{
                fontFamily: "English",
              }}
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="off"
            />
          </div>
          <div className={classes.formAction}>
            <p className={classes.alert}>{alert}</p>
            <button
              style={{
                fontFamily: "Farsi",
              }}
              onClick={() => handleLogin()}
            >
              {formType ? <>ورود</> : <>ثبت نام</>}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
