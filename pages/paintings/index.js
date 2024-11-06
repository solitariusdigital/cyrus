import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./paintings.module.scss";
import Image from "next/legacy/image";
import GallerySlider from "@/components/GallerySlider";
import CloseIcon from "@mui/icons-material/Close";

export default function Paintings() {
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);

  const works = [
    "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg",
    "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg",
    "https://eshareh.storage.iran.liara.space/cover/cov156042/img6851.jpg",
    "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg",
  ];

  const gallerySlider = () => {
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={classes.container}>
      <div className={classes.gridBox}>
        <div className={classes.columnTwo} onClick={() => gallerySlider()}>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov156042/img6851.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov156042/img6851.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
        </div>
        <div className={classes.columnOne}>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov156042/img6851.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov156042/img6851.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
        </div>
        <div className={classes.columnTwo}>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov156042/img6851.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov156042/img6851.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov720908/img6055.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              blurDataURL={
                "https://eshareh.storage.iran.liara.space/cover/cov913559/img2034.jpg"
              }
              placeholder="blur"
              alt="cover"
              layout="fill"
              objectFit="cover"
              as="image"
              priority
            />
          </div>
        </div>
      </div>
      {displayGallerySlider && (
        <div className={classes.gallerySlider}>
          <div className={classes.icon}>
            <CloseIcon
              onClick={() => {
                setDisplayGallerySlider(false);
                document.body.style.overflow = "auto";
              }}
            />
          </div>
          <h2>works</h2>
          <GallerySlider media={works} />
        </div>
      )}
    </div>
  );
}
