import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Works from "@/components/forms/Works";
import Router from "next/router";

export default function Admin() {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);

  // useEffect(() => {
  //   if (permissionControl !== "admin") {
  //     Router.push("/portal");
  //   }
  // }, [permissionControl]);

  return (
    <div className={classes.container}>
      <h3>{currentUser?.name}</h3>
      <Works />
    </div>
  );
}
