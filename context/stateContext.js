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
        fa: "فیلم",
        en: "Movies",
      },
      link: "/movies",
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
    // {
    //   title: {
    //     fa: "بلاگز",
    //     en: "Blogs",
    //   },
    //   link: "/blogs",
    //   active: false,
    // },
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
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
