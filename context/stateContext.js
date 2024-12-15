import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [language, setLanguage] = useState(true);
  const [languageType, setLanguageType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [menuMobile, setMenuMobile] = useState(false);
  const [permissionControl, setPermissionControl] = useState("user" || "admin");
  const [displayMenu, setDisplayMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet-landscape" || "tablet-portrait" || "mobile"
  );
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: {
        fa: "نقاشی‌",
        en: "Paintings",
      },
      link: "/paintings",
      active: false,
    },
    {
      title: {
        fa: "سینما",
        en: "Cinema",
      },
      link: "/cinema",
      active: false,
    },
    {
      title: {
        fa: "سفر",
        en: "Travels",
      },
      link: "/travels",
      active: false,
    },
    {
      title: {
        fa: "وبلاگ",
        en: "Blogs",
      },
      link: "/blogs",
      active: false,
    },
    {
      title: {
        fa: "درباره",
        en: "About",
      },
      link: "/about",
      active: false,
    },
    {
      title: {
        fa: "تماس",
        en: "Contact",
      },
      link: "/contact",
      active: false,
    },
  ]);
  const [paintingTypes, setPaintingTypes] = useState([
    {
      fa: "اکریلیک",
      en: "Acrylic",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2853.JPG",
      active: false,
    },
    {
      fa: "آبرنگ",
      en: "Watercolor",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2854.JPG",
      active: false,
    },
    {
      fa: "ماژیک",
      en: "Marker",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG",
      active: false,
    },
    {
      fa: "طرح",
      en: "Sketch",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2853.JPG",
      active: false,
    },
  ]);
  const [cinemaTypes, setCinemaTypes] = useState([
    {
      fa: "سینما",
      en: "Cinema",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG",
      active: false,
    },
    {
      fa: "تئاتر",
      en: "Theatre",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2853.JPG",
      active: false,
    },
    {
      fa: "سریال",
      en: "Series",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG",
      active: false,
    },
    {
      fa: "فیلم کوتاه",
      en: "Short Film",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2854.JPG",
      active: false,
    },
    {
      fa: "نمایشگاه",
      en: "Exhibitions",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG",
      active: false,
    },
    {
      fa: "جوایز",
      en: "Awards",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2854.JPG",
      active: false,
    },
  ]);
  const [travelTypes, setTravelTypes] = useState([
    {
      fa: "جهان",
      en: "World",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG",
      active: false,
    },
    {
      fa: "ایران",
      en: "Iran",
      media: "https://cyrus.storage.c2.liara.space/assets/IMG_2854.JPG",
      active: false,
    },
  ]);
  const stateContext = {
    language,
    setLanguage,
    languageType,
    setLanguageType,
    currentUser,
    setCurrentUser,
    menuMobile,
    setMenuMobile,
    permissionControl,
    setPermissionControl,
    screenSize,
    setScreenSize,
    navigationTopBar,
    setNavigationTopBar,
    displayMenu,
    setDisplayMenu,
    paintingTypes,
    setPaintingTypes,
    cinemaTypes,
    setCinemaTypes,
    travelTypes,
    setTravelTypes,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
