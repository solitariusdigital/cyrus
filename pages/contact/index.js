import classes from "./contact.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

export default function Contact() {
  return (
    <div className={classes.container}>
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
  );
}
