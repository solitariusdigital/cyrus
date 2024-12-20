import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./blogs.module.scss";
import dbConnect from "@/services/dbConnect";
import blogsModel from "@/models/Blogs";
import { replaceSpacesAndHyphens, convertDate } from "@/services/utility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Router from "next/router";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";

export default function Blog({ blogs, blogTitle }) {
  const { languageType, setLanguageType } = useContext(StateContext);
  const { language, setLanguage } = useContext(StateContext);
  const [displayBlog, setDisplayBlog] = useState(null);

  useEffect(() => {
    let blog = null;
    blog = blogs.find(
      (p) => p.en.title === blogTitle || p.fa.title === blogTitle
    );
    if (!blog) {
      Router.push("/404");
      return;
    }
    setDisplayBlog(blog);
  }, [blogTitle, blogs]);

  return (
    <Fragment>
      {displayBlog && (
        <Fragment>
          <NextSeo
            title={displayBlog[languageType].title}
            description={displayBlog[languageType].title}
            canonical={`https://panteapaint.com/blogs/${replaceSpacesAndHyphens(
              displayBlog[languageType].title
            )}`}
            openGraph={{
              type: "website",
              locale: "fa_IR",
              url: `https://panteapaint.com/blogs/${replaceSpacesAndHyphens(
                displayBlog[languageType].title
              )}`,
              title: `${displayBlog[languageType].title}`,
              description: `${displayBlog[languageType].subtitle}`,
              siteName: language ? "پان ته آ سیروس" : "Pantea Cyrus",
              article: {
                publishedTime: displayBlog.createdAt,
                modifiedTime: displayBlog.updatedAt,
                authors: ["https://www.panteapaint.com"],
              },
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
          <div className={language ? classes.blogBox : classes.blogBoxReverse}>
            <div className={classes.row}>
              <h3>{displayBlog[languageType].title}</h3>
              <ArrowBackIosNewIcon
                className="icon"
                onClick={() => Router.push("/blogs")}
              />
            </div>
            <p className={classes.date}>
              {convertDate(displayBlog.createdAt, language ? "fa" : "en")}
            </p>
            {displayBlog[languageType].description
              .split("\n\n")
              .map((desc, index) => (
                <p key={index} className={classes.description}>
                  {desc}
                </p>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
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
