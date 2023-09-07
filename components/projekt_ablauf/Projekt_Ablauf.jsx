import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap } from "gsap";

import styles from './Projekt_Ablauf.module.css';

const Projekt_Ablauf = forwardRef(({ projekt_ablauf_items, button }, ref) => {
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
    <div className={ styles['projekt-ablauf'] } ref={ref}>
      <h2 ref={addLineRef}>
        In nur 6 Schritten können Sie Ihre eigene Website erstellen lassen.  
      </h2>
      <div className={ styles['items'] }> 
        {projekt_ablauf_items.map((item, index) => (
          <div className={ styles['item'] } key={item.title[0].text}>
            <h3 className={ styles['title'] }>
              <span>{index+1}.</span>
              {item.title[0].text}
            </h3>
            <p className={ styles['description'] }>
              {item.description[0].text}
            </p>
          </div>
        ))}
      </div>
      {button ? <a href={`${button}?subject=DevKid - Website erstellen lassen`} className={ styles['cta-button'] } title="Anfrage">Jetzt Ihre eigene Website erstellen lassen</a> : null} 
    </div>
  );
});

Projekt_Ablauf.displayName = 'Projekt Ablauf';
export default Projekt_Ablauf;