import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./blogs.module.scss";
import dbConnect from "@/services/dbConnect";
import blogsModel from "@/models/Blogs";
import { replaceSpacesAndHyphens, convertDate } from "@/services/utility";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Router from "next/router";

export default function Blog({ blogs, blogTitle }) {
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [displayBlog, setDisplayBlog] = useState([]);

  useEffect(() => {
    let blog = null;
    blog = blogs.find(
      (p) => p.en.title === blogTitle || p.fa.title === blogTitle
    );
    setDisplayBlog(blog);
  }, [blogTitle, blogs]);

  return (
    <div className={language ? classes.blogBox : classes.blogBoxReverse}>
      <div className={classes.row}>
        <h3>{displayBlog[languageType]?.title}</h3>
        <ArrowBackIosIcon
          className="icon"
          onClick={() => Router.push("/blogs")}
          sx={{ color: "#1e3638" }}
        />
      </div>
      <p className={classes.date}>
        {convertDate(displayBlog.createdAt, language ? "fa" : "en")}
      </p>
      {displayBlog[languageType]?.description
        .split("\n\n")
        .map((desc, index) => (
          <p key={index} className={classes.description}>
            {desc}
          </p>
        ))}
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    let blogs = await blogsModel.find();
    return {
      props: {
        blogs: JSON.parse(JSON.stringify(blogs)),
        blogTitle: JSON.parse(
          JSON.stringify(replaceSpacesAndHyphens(context.query.blog))
        ),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
