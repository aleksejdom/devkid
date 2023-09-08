import React, { useRef, useEffect } from 'react';
import styles from './Usp_Box.module.scss';
import { RichText } from 'prismic-reactjs'
import Image from 'next/image';
import { gsap } from "gsap";

export default function Usp_Box({usp}) {

  const lineRefs = useRef([]);
  useEffect(() => {
    let observer;
    const currentRefs = lineRefs.current;
    const handleIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            { 
              y: 45,
              opacity: 0, 
            },
            {
              delay: index * 0.1,
              duration: 1.6,
              y: 0,
              ease: "power3.out",
              opacity: 1,
              onComplete: () => {
                // Setzt die Animation zurück, wenn sie abgeschlossen ist
                //gsap.set(entry.target, { clearProps: "all" });
              }
            }
          );
        }
      });
    };
  
    if (currentRefs.length > 0) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      currentRefs.forEach(ref => observer.observe(ref));
    }
  
    return () => {
      if (observer) {
        currentRefs.forEach(ref => observer.unobserve(ref));
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
            <Image src={item.usp_image.url} alt='USP' title='USP' layout='fill' objectFit='cover' ref={addLineRef}/>
            <p ref={addLineRef}>{RichText.asText(item.usp_title)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}