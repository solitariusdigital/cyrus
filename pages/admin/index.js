import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Works from "@/components/forms/Works";
import Blogs from "@/components/forms/Blogs";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import blogsModel from "@/models/Blogs";
import worksModel from "@/models/Works";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";

export default function Admin({ worksData, blogsData }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
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
      <NextSeo
        title={language ? "ادمین" : "Admin"}
        description={language ? "هنرمند حرفه‌ای" : "Professional Artist"}
        canonical="https://panteapaint.com/admin"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://panteapaint.com/admin",
          title: language ? "ادمین" : "Admin",
          description: language ? "هنرمند حرفه‌ای" : "Professional Artist",
          siteName: language ? "پان ته آ سیروس" : "Pantea Cyrus",
          images: {
            url: logoIcon,
            width: 1200,
            height: 630,
            alt: language ? "پان ته آ سیروس" : "Pantea Cyrus",
          },
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
      />
      {displayAdmin && (
        <div className={classes.container}>
          <h3
            style={{
              fontFamily: "English",
            }}
          >
            {currentUser?.name}
          </h3>
          <div
            className={classes.navigation}
            style={{
              fontFamily: "Farsi",
            }}
          >
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
          {pageType === "آثار" && <Works worksData={worksData} />}
          {pageType === "وبلاگ" && <Blogs blogsData={blogsData} />}
        </div>
      )}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    let blogs = await blogsModel.find();
    let works = await worksModel.find();
    let blogsData = blogs.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    let worksData = works.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return {
      props: {
        blogsData: JSON.parse(JSON.stringify(blogsData)),
        worksData: JSON.parse(JSON.stringify(worksData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
