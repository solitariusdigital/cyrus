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
      fa: "رنگ روغن",
      en: "Oil Color",
      media:
        "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    },
    {
      fa: "اکریلیک",
      en: "Acrylic",
      media:
        "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
    },
    {
      fa: "آبرنگ",
      en: "Watercolor",
      media:
        "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    },
    {
      fa: "طرح",
      en: "Sketch",
      media:
        "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    },
  ]);
  const [cinemaTypes, setCinemaTypes] = useState([
    {
      fa: "سینما",
      en: "Cinema",
      media:
        "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    },
    {
      fa: "تئاتر",
      en: "Theatre",
      media:
        "https://cyrus.storage.c2.liara.space/photos/3a57e405-bec0-45df-8b6d-4ec0af2f64ea.JPG",
    },
    {
      fa: "سریال",
      en: "Series",
      media:
        "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    },
    {
      fa: "فیلم کوتاه",
      en: "Short Film",
      media:
        "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    },
    {
      fa: "نمایشگاه",
      en: "Exhibitions",
      media:
        "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    },
    {
      fa: "جوایز",
      en: "Awards",
      media:
        "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
    },
  ]);
  const [travelTypes, setTravelTypes] = useState([
    {
      fa: "جهان گردی",
      en: "World Travel",
      media:
        "https://cyrus.storage.c2.liara.space/photos/1bc62462-716f-469a-aebe-a91f2138e902.JPG",
    },
    {
      fa: "ایران گردی",
      en: "Iran Travel",
      media:
        "https://cyrus.storage.c2.liara.space/photos/6efa4ae2-fd3c-46d8-a92b-76d28f709948.JPG",
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
