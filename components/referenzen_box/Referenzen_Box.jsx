import React, { useRef, useState, useEffect, forwardRef } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Referenzen_Box.module.css';
import { RichText } from 'prismic-reactjs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from 'next/image';



SwiperCore.use([Navigation]);

const Referenzen_Box = forwardRef(({ referenzen, referenzenContent }, ref) => {
  const swiperRef = useRef(null); 
  const colors = ['#05473C', '#4A3170', '#7D0B32']; 
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
 
  useEffect(() => {
    const timer = setInterval(() => {
      setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
    }, 6500);
    return () => clearInterval(timer);  
  }, [colors.length]);

  const lineRefs = useRef([]); 
  useEffect(() => {
    let observer;
  
    const handleIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            { y: 45 },
            {
              delay: index * 0.1,
              duration: 1.0,
              y: 0,
              ease: "power3.out",
              onComplete: () => {
                // Setzt die Animation zurück, wenn sie abgeschlossen ist
                //gsap.set(entry.target, { clearProps: "all" });
              }
            }
          );
        }
      });
    };
  
    if (lineRefs.current.length > 0) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      lineRefs.current.forEach(ref => observer.observe(ref));
    }
  
    return () => {
      if (observer) {
        lineRefs.current.forEach(ref => observer.unobserve(ref));
      }
    };
  }, []); 
  const addLineRef = (el) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  }; 

  return (
    <div className={styles.referenzenBox} style={{ backgroundColor: colors[colorIndex] }} ref={ref}>
      <div className={styles.referenzenWrapper}>
        <h3>Referenzen</h3>
        <div className={styles.referenzenItems}>
          <div className={styles.referenzenNavs}>
            <Image 
              src="/images/arrow.svg" 
              alt="arrow"
              title="Slider Arrow" 
              className={styles.referenzenButton} 
              onClick={prevSlide}
              width={35}
              height={27}
            />
            <Image 
              src="/images/arrow.svg" 
              alt="arrow"
              title="Slider Arrow"  
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
              640: {
                slidesPerView: 2,
              }, 
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
                    title={item.referenz_image.alt} 
                  />
                  <p>{RichText.asText(item.referenz_title)}</p>
                </div> 
              </SwiperSlide>
            ))}
          </Swiper> 
        </div>
      </div>
      <div className={styles.referenzenContent}>
        {
          referenzenContent.map((content, index) => {
            const { type, text, spans } = content;
          
            // Eine Funktion, um den Text mit möglichen Hyperlinks zu rendern
            const renderTextWithSpans = () => {
              let lastIndex = 0;
              const elements = [];
          
              spans.forEach((span, spanIndex) => {
                const beforeLink = text.slice(lastIndex, span.start);
                lastIndex = span.end;
          
                if (span.type === 'hyperlink') {
                  elements.push(beforeLink);
                  elements.push(
                    <a key={`span-${spanIndex}`} href={span.data.url}>
                      {text.slice(span.start, span.end)}
                    </a>
                  );
                }
              });
          
              // Den Rest des Textes hinzufügen
              elements.push(text.slice(lastIndex));
          
              return elements;
            };
          
            switch (type) {
              case 'heading3':
                return (
                <h3 key={index} ref={addLineRef}>{text}</h3>
                );
              case 'heading2':
                  return (
                    <h2 key={index} ref={addLineRef}>{text}</h2>
                  );  
              case 'paragraph':
                return <p key={index}>{renderTextWithSpans()}</p>;
              default:
                return null;
            }
          })
        }
        <a href={`mailto:devkid.stgt@gmail.com?subject=DevKid - Erstgespräch Anfrage`} className={["cta-button"]} title="Website Erstellung">Kostenloses Erstgespräch anfragen</a>
      </div>
    </div>
  )
});

Referenzen_Box.displayName = 'Referenzen Box';

export default Referenzen_Box;