import React from "react";
import styles from "./carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { img } from './img/data'
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
img.map((imageItem,i)=>{
    return <img key={i} src={imageItem}/>
})
        }
      </Carousel>
      <div className={styles.hero_img}></div>
    </div>
  );
};

export default CarouselEffect;
