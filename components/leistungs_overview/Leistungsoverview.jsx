import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap } from "gsap";

import styles from './Leistungsoverview.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Leistungsoverview = forwardRef(({ leistungsoverview_items, leistungsoverview_title }, ref) => {
  const lineRefs = useRef([]);
  useEffect(() => {
    let observer;
    const currentRefs = lineRefs.current;
    const handleIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            { y: 45,
              opacity: 0,
             },
            {
              delay: index * 0.1,
              duration: 1.0,
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
    <div className={ styles['leistungs-overview'] } ref={ref}>
       
      <h2 ref={addLineRef}>
        {leistungsoverview_title[0].text}  
      </h2> 
      
      <div className={ styles['items'] }> 
        {leistungsoverview_items.map((item, index) => (
          <div className={ styles['item'] } key={index} ref={addLineRef}> 
            <div className={ styles['item-header'] } ref={addLineRef}>
              <LazyLoadImage 
                src={item.icon.url} 
                alt={item.icon.alt}
                title={item.icon.alt}  
              />
              <h3>{item.content[0].text}</h3>
            </div>
            <p>{item.content[1].text}</p>
          </div>
        ))}
      </div> 
    </div>
  );
});

Leistungsoverview.displayName = 'Leistungs Overview';
export default Leistungsoverview;