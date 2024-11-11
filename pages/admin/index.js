import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Works from "@/components/forms/Works";
import Blogs from "@/components/forms/Blogs";
import Router from "next/router";

export default function Admin() {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [displayAdmin, setDisplayAdmin] = useState(false);
  const [pageType, setPageType] = useState("آثار" || "وبلاگ");
  const navigation = ["وبلاگ", "آثار"];

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/portal");
    } else {
      setDisplayAdmin(true);
    }
  }, [permissionControl]);

  return (
    <Fragment>
      {displayAdmin && (
        <div className={classes.container}>
          <h3>{currentUser?.name}</h3>
          <div className={classes.navigation}>
            {navigation.map((nav, index) => (
              <p
                key={index}
                className={pageType === nav ? classes.navActive : classes.nav}
                onClick={() => setPageType(nav)}
              >
                {nav}
              </p>
            ))}
          </div>
          {pageType === "آثار" && <Works />}
          {pageType === "وبلاگ" && <Blogs />}
        </div>
      )}
    </Fragment>
  );
}
