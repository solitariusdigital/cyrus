import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";
import Router from "next/router";

export default function Footer() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const activateNav = (link, index) => {
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

  return (
    <footer className={classes.footer}>
      <div
        className={language ? classes.navigation : classes.navigationReverse}
      >
        {navigationTopBar
          .map((nav, index) => (
            <Fragment key={index}>
              <p
                className={!nav.active ? classes.nav : classes.navActive}
                onClick={() => activateNav(nav.link, index)}
              >
                {nav.title[languageType]}
              </p>
            </Fragment>
          ))
          .slice(0, 3)}
      </div>
      <p className={classes.admin} onClick={() => Router.push("/admin")}></p>
    </footer>
  );
}
