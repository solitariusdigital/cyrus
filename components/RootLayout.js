import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Image from "next/legacy/image";
import logo from "@/assets/logo.png";

export default function RootLayout({ children }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { displayMenu, setDisplayMenu } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);

  const handleResize = () => {
    let element = document.getElementById("detailsInformation");
    if (element) {
      let elemHeight = element.getBoundingClientRect().height;
      setHeroHeight(elemHeight);
    }
    const width = window.innerWidth;
    const height = window.innerHeight;

    let screenSize;
    if (width < 700) {
      screenSize = "mobile";
    } else if (width >= 700 && width < 1400) {
      screenSize = width > height ? "tablet-landscape" : "tablet-portrait";
    } else {
      screenSize = "desktop";
    }
    setScreenSize(screenSize);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLanguageType("fa");
    setLanguage(true);
  }, [setLanguage, setLanguageType]);

  useEffect(() => {
    setTimeout(() => {
      setAppLoader(true);
    }, 1500);
  }, []);

  return (
    <Fragment>
      {appLoader ? (
        <div
          style={{
            fontFamily: language ? "Farsi" : "English",
          }}
        >
          {displayMenu && (
            <section className="menu animate__animated animate__slideInDown">
              <Menu />
            </section>
          )}
          <section className="main">
            <main>{children}</main>
          </section>
          <section className="footer animate__animated animate__slideInUp">
            <Footer />
          </section>
        </div>
      ) : (
        <div className="appload">
          <Image
            className="animate__animated animate__fadeInDown"
            width={50}
            height={500}
            src={logo}
            alt="logo"
            as="image"
            priority
          />
          <h1
            className="animate__animated animate__pulse"
            style={{
              fontFamily: language ? "EnglishLight" : "EnglishLight",
            }}
            onClick={() => window.location.assign("/")}
          >
            Pantea Cyrus
          </h1>
        </div>
      )}
    </Fragment>
  );
}
