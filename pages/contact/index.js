import { Fragment, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./contact.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";

export default function Contact() {
  const { language, setLanguage } = useContext(StateContext);

  return (
    <Fragment>
      <NextSeo
        title={language ? "تماس" : "Contact"}
        description={language ? "هنرمند حرفه‌ای" : "Professional Artist"}
        canonical="https://panteapaint.com/contact"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://panteapaint.com/contact",
          title: language ? "تماس" : "Contact",
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
      <div
        className={classes.container}
        style={{
          fontFamily: "English",
        }}
      >
        <div className={classes.items}>
          <div
            className={classes.item}
            onClick={() =>
              window.open(
                "https://www.instagram.com/panteacyrus.official/",
                "_ self"
              )
            }
          >
            <InstagramIcon sx={{ fontSize: 30 }} />
            <h3>panteacyrus.official</h3>
          </div>
          <div className={classes.item}>
            <EmailIcon sx={{ fontSize: 30 }} />
            <h3>cyruspantea@gmail.com</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
