import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Interactive from "@/components/Interactive";
import Menu from "@/components/Menu";

export default function Home() {
  const { language, setLanguage } = useContext(StateContext);
  const [colorOne, setColorOne] = useState("#AF7AC5");
  const [colorTwo, setColorTwo] = useState("#F39C12");
  const [expandProcess, setExpandProcess] = useState(false);
  const [expandEducation, setExpandEducation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <Menu />
      </div>
      <Interactive />
    </div>
  );
}
