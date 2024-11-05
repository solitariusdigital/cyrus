import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Menu.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";
import logo from "@/assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Menu() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  const activateNav = (link, index) => {
    setMenuMobile(false);
    navigationTopBar.map((nav, i) => {
      if (i === index) {
        Router.push(link);
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
  };

  const toggleLanguage = () => {
    setLanguage(!language);
    setLanguageType(!language ? "fa" : "en");
  };

  return (
    <div className={classes.container}>
      <div className={classes.navigationBar}>
        <h1
          style={{
            fontFamily: language ? "EnglishLight" : "EnglishLight",
          }}
          onClick={() => window.location.assign("/")}
        >
          Pantea Cyrus
        </h1>
        <div className={classes.control}>
          <div onClick={() => toggleLanguage()}>
            {language ? <p>EN</p> : <p>FA</p>}
          </div>
          {menuMobile ? (
            <CloseIcon
              className="icon"
              onClick={() => setMenuMobile(!menuMobile)}
              sx={{ fontSize: 34 }}
            />
          ) : (
            <MenuIcon
              className="icon"
              onClick={() => setMenuMobile(!menuMobile)}
              sx={{ fontSize: 34 }}
            />
          )}
        </div>
      </div>
      {menuMobile && (
        <div
          className={`${classes.navigation} animate__animated animate__slideInRight`}
        >
          <nav className={classes.navigationBox}>
            {navigationTopBar.map((nav, index) => (
              <Fragment key={index}>
                <a
                  className={!nav.active ? classes.nav : classes.navActive}
                  onClick={() => activateNav(nav.link, index)}
                >
                  {nav.title[languageType]}
                </a>
              </Fragment>
            ))}
          </nav>
          <div
            className={classes.logo}
            onClick={() => window.location.assign("/")}
          >
            <Image src={logo} layout="fill" objectFit="contain" alt="logo" />
          </div>
        </div>
      )}
    </div>
  );
}
