import React, { useRef, useEffect } from 'react';
import styles from './Usp_Box.module.scss';
import { RichText } from 'prismic-reactjs'
import Image from 'next/image';
import { gsap } from "gsap";

export default function Usp_Box({usp}) {

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
    <div className={styles.uspBox}>
      <h3 ref={addLineRef}>Das können unsere Kunden von uns erwarten.</h3>
      <div className={styles.items}> 
        {usp.map((item, index) => (
          <div className={styles.item} key={`usp-item-${index}`}>
            <Image src={item.usp_image.url} alt='USP' title='USP' layout='fill' objectFit='cover' />
            <p>{RichText.asText(item.usp_title)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}