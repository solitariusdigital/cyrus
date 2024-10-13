import { useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Menu.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";

export default function Menu() {
  const { language, setLanguage } = useContext(StateContext);

  return (
    <div className={classes.container}>
      <p>About</p>
      <p>Contact</p>
      <p>Projects</p>
    </div>
  );
}
