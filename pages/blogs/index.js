import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./blogs.module.scss";
import dbConnect from "@/services/dbConnect";
import blogsModel from "@/models/Blogs";
import { convertDate } from "@/services/utility";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Router from "next/router";
import { sliceString, replaceSpacesAndHyphens } from "@/services/utility";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  getSingleBlogsApi,
  updateBlogsApi,
  deleteBlogsApi,
} from "@/services/api";

export default function Blogs({ blogsData }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [displayBlogs, setDisplayBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (permissionControl === "admin") {
      setDisplayBlogs(blogsData);
    } else {
      setDisplayBlogs(blogsData.filter((blog) => blog.active));
    }
  }, [blogsData, permissionControl]);

  const updateBlogs = async (id, type) => {
    let confirmationMessage = "مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      let blogData = await getSingleBlogsApi(id);
      switch (type) {
        case "show":
          blogData.active = true;
          break;
        case "hide":
          blogData.active = false;
          break;
      }
      await updateBlogsApi(blogData);
      router.replace(router.asPath);
    }
  };

  const deleteBlogs = async (index) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteBlogsApi(blogs[index]["_id"]);
      router.replace(router.asPath);
    }
  };

  return (
    <div className={language ? classes.container : classes.containerReverse}>
      {displayBlogs.map((blog, index) => (
        <div
          key={index}
          className={language ? classes.item : classes.itemReverse}
        >
          {permissionControl === "admin" && (
            <Fragment>
              {blog.active ? (
                <Tooltip title="Hide">
                  <VerifiedUserIcon
                    className="icon"
                    sx={{ color: "#57a361" }}
                    onClick={() => updateBlogs(blog["_id"], "hide")}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Show">
                  <VisibilityOffIcon
                    className="icon"
                    sx={{ color: "#d40d12" }}
                    onClick={() => updateBlogs(blog["_id"], "show")}
                  />
                </Tooltip>
              )}
              <Tooltip title="Delete">
                <DeleteOutlineIcon
                  className="icon"
                  sx={{ color: "#d40d12" }}
                  onClick={() => deleteBlogs(index)}
                />
              </Tooltip>
            </Fragment>
          )}
          <div className={classes.row}>
            <h3>{blog[languageType].title}</h3>
            <p className={classes.date}>
              {convertDate(blog.createdAt, language ? "fa" : "en")}
            </p>
          </div>
          <p className={classes.description}>
            {sliceString(blog[languageType].description, 150)}
          </p>
          <div
            className={language ? classes.more : classes.moreReverse}
            onClick={() =>
              Router.push(
                `/blogs/${replaceSpacesAndHyphens(blog[languageType].title)}`
              )
            }
          >
            <p>{language ? "ادامه مطلب" : "Read more"}</p>
            {language ? (
              <ArrowBackIosIcon
                className={classes.icon}
                sx={{ fontSize: 16, color: "#c79c6e" }}
              />
            ) : (
              <ArrowForwardIosIcon
                className={classes.icon}
                sx={{ fontSize: 16, color: "#c79c6e" }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    let blogs = await blogsModel.find();
    let blogsData = blogs.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return {
      props: {
        blogsData: JSON.parse(JSON.stringify(blogsData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
