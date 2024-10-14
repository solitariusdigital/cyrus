import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./paintings.module.scss";
import Image from "next/legacy/image";

export default function Paintings() {
  return (
    <Fragment>
      <div className={classes.container}>
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
    </Fragment>
  );
}
