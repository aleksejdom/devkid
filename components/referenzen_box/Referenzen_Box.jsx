import React, { useRef, useState, useEffect } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Referenzen_Box.module.css';
import { RichText } from 'prismic-reactjs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from 'next/image';



SwiperCore.use([Navigation]);

export default function Referenzen_Box({referenzen, referenzenContent}) {
  const swiperRef = useRef(null);
  // Array of colors
  const colors = ['#05473C', '#4A3170', '#7D0B32'];
  // State for the current color
  const [colorIndex, setColorIndex] = useState(0);

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Change the color every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
    }, 6500);
    return () => clearInterval(timer);  
  }, []);

  return (
    <div className={styles.referenzenBox} style={{ backgroundColor: colors[colorIndex] }}>
      <div className={styles.referenzenWrapper}>
        <h3>Referenzen</h3>
        <div className={styles.referenzenItems}>
          <div className={styles.referenzenNavs}>
            <Image 
              src="/images/arrow.svg" 
              alt="arrow" 
              className={styles.referenzenButton} 
              onClick={prevSlide}
              width={35}
              height={27}
            />
            <Image 
              src="/images/arrow.svg" 
              alt="arrow" 
              className={styles.referenzenButton} 
              onClick={nextSlide}
              width={35}
              height={27}
            />                    
          </div>
          <Swiper
            ref={swiperRef}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }} 
            spaceBetween={0}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
              },
            }}  
            loop={true} 
          >
            {referenzen.map((item, index) => ( 
              <SwiperSlide key={`referenzen-item-${index}`}>
                <div className={styles.referenzenItem}>
                  <LazyLoadImage 
                    src={item.referenz_image.url} 
                    alt={item.referenz_image.alt} 
                  />
                  <p>{RichText.asText(item.referenz_title)}</p>
                </div> 
              </SwiperSlide>
            ))}
          </Swiper> 
        </div>
      </div>
      <div className={styles.referenzenContent}>
        {referenzenContent.map((paragraph, index) => {
          // Für den ersten Absatz rendern wir einen h2-Tag
          if (index === 0) {
            return <h2 key={index}>{paragraph.text}</h2>;
          }
          // Für die restlichen Absätze verwenden wir den p-Tag
          return <p key={index}>{paragraph.text}</p>;
        })}
        <a href={`/website-erstellen-lassen/`} className={["cta-button"]}>Sie möchten eine Website erstellen lassen<br />Jetzt Mehr erfahren</a>
      </div>
    </div>
  )
}