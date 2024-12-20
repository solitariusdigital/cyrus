import { Fragment, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./about.module.scss";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import logoIcon from "@/assets/logoIcon.png";

export default function About() {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  return (
    <Fragment>
      <NextSeo
        title={language ? "درباره" : "About"}
        description={language ? "هنرمند حرفه‌ای" : "Professional Artist"}
        canonical="https://panteapaint.com/about"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://panteapaint.com/about",
          title: language ? "درباره" : "About",
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
      <div className={classes.container}>
        <div className={classes.infoBox}>
          <h2
            style={{
              direction: language ? "rtl" : "ltr",
            }}
          >
            {language ? "درباره" : "About"}
          </h2>
          <div
            className={
              language ? classes.information : classes.informationReverse
            }
          >
            <p>
              {language
                ? "زمانی که هنوز هلیوم شناخته نشده بود، ستاره‌شناس فرانسوی ژول ژانسن در جریان خورشیدگرفتگی سال ۱۸۶۸ برای نخستین بار در طیف‌بینی نور خورشید، خط زرد طیفی هلیوم را دید. در جریان همان خورشیدگرفتگی، نورمن لاکیر پیشنهاد کرد این خط زرد می‌تواند به دلیل یک عنصر تازه باشد. دو شیمی‌دان سوئدی با نام‌های پر تئودر کلیو و نیلز آبراهام لانگلت در سال ۱۸۹۵ این عنصر را شناسایی و اعلام کردند. آن‌ها هلیوم را از سنگ کلویت که کانی اورانیوم است، به‌دست آوردند. در سال ۱۹۰۳ منابع بزرگ هلیوم در میدان‌های گازی ایالات متحده پیدا شد. هلیوم، بعد از هیدروژن، هم از نظر سبکی و هم از نظر فراوانی، دومین عنصر کیهان است، گرچه با وجود کاربردهای بسیار مهم و حیاتی که دارد، بر روی زمین بسیار کمیاب است. نزدیک به ۲۴٪ از جرم گیتی، سهم این عنصر است که این مقدار بیش از ۱۲ برابر ترکیب تمام عنصرهای سنگین است. زمانی که هنوز هلیوم شناخته نشده بود، ستاره‌شناس فرانسوی ژول ژانسن در جریان خورشیدگرفتگی سال ۱۸۶۸ برای نخستین بار در طیف‌بینی نور خورشید، خط زرد طیفی هلیوم را دید. در جریان همان خورشیدگرفتگی، نورمن لاکیر پیشنهاد کرد این خط زرد می‌تواند به دلیل یک عنصر تازه باشد. دو شیمی‌دان سوئدی با نام‌های پر تئودر کلیو و نیلز آبراهام لانگلت در سال ۱۸۹۵ این عنصر را شناسایی و اعلام کردند. آن‌ها هلیوم را از سنگ کلویت که کانی اورانیوم است، به‌دست آوردند. در سال ۱۹۰۳ منابع بزرگ هلیوم در میدان‌های گازی ایالات متحده پیدا شد. هلیوم، بعد از هیدروژن، هم از نظر سبکی و هم از نظر فراوانی، دومین عنصر کیهان است، گرچه با وجود کاربردهای بسیار مهم و حیاتی که دارد، بر روی زمین بسیار کمیاب است. نزدیک به ۲۴٪ از جرم گیتی، سهم این عنصر است که این مقدار بیش از ۱۲ برابر ترکیب تمام عنصرهای سنگین است."
                : "There is no generally agreed definition of what constitutes art, and its interpretation has varied greatly throughout history and across cultures. In the Western tradition, the three classical branches ofv isual art are painting, sculpture, and architecture. Theatre, dance, and other performing arts, as well as literature, music, film and other media such as interactive media, are included in a broader definition of art. Until the 17th century, art referred to any skill or mastery and was not differentiated from crafts or sciences. I modern usage after the 17th century, where aesthetic considerations are paramount, the fine arts are separated and distinguished from acquired skills in general, such as the decorative or applied arts. There is no generally agreed definition of what constitutes art, and its interpretation has varied greatly throughout history and across cultures. In the Western tradition, the three classical branches ofv isual art are painting, sculpture, and architecture. Theatre, dance, and other performing arts, as well as literature, music, film and other media such as interactive media, are included in a broader definition of art. Until the 17th century, art referred to any skill or mastery and was not differentiated from crafts or sciences. I modern usage after the 17th century, where aesthetic considerations are paramount, the fine arts are separated and distinguished from acquired skills in general, such as the decorative or applied arts. Across cultures. In the Western tradition, the three classical branches ofv isual art are painting, sculpture, and architecture. Theatre, dance, and other performing arts, as well as literature, music, film and other media such as interactive media, are included in a broader definition of art. Until the 17th century, art referred to any skill or mastery and was not differentiated from crafts or sciences. I modern usage after the 17th century, where aesthetic considerations are paramount, the fine arts are separated and distinguished from acquired skills in general, such as the decorative or applied arts. art referred to any skill or mastery and was not differentiated from crafts or sciences. I modern usage after the 17th century, where aesthetic considerations are paramount, the fine arts are separated and distinguished from acquired skills in general, such as the decorative or applied arts."}
            </p>
          </div>
        </div>
        <div className={classes.imageBox}>
          <div className={classes.image}>
            <Image
              className={classes.image}
              src={"https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG"}
              blurDataURL={
                "https://cyrus.storage.c2.liara.space/assets/IMG_2852.JPG"
              }
              placeholder="blur"
              alt="image"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
