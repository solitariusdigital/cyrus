import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";

export default function Footer() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  return (
    <footer className={classes.footer}>
      <div>
        <p>Footer</p>
      </div>
    </footer>
  );
}
