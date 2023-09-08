import React, { useEffect, useRef } from 'react';
import styles from './Contact_Box.module.css';  
import Image from 'next/image';
import { gsap } from "gsap";
import Prismic from 'prismic-javascript'; 
 
const renderRichText = (richTextArray) => {
  return richTextArray.map((item, index) => {
    switch (item.type) {
      case 'heading1':
        return <h1 key={index}>{item.text}</h1>;
      case 'heading3':
        return <h3 key={index}>{item.text}</h3>;
      case 'paragraph':
        return <p key={index}>{item.text}</p>;
      default:
        return null;
    }
  });
};

  

export default function Contact_Box({ contact }) {

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
              duration: 1.6,
              y: 0,
              opacity: 1,
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
    <div className={styles['contact-box']}>
      <div className={styles.title} ref={addLineRef}>
        {renderRichText(contact.contact_title)}
      </div>
      <Image src={contact.contact_image.url} alt='Aleksej Domovec' title="Webentwickler Stuttgart" width={860} height={804} className={styles.photo} ref={addLineRef}/>
      <div className={styles.details}>
        <p className={styles.name} ref={addLineRef}>Aleksej Domovec</p>
        <div ref={addLineRef}>
          {renderRichText(contact.contact_number)}
        </div>
        <div ref={addLineRef}>
          <a href={`mailto:devkid.stgt@gmail.com?subject=DevKid - Anfrage`} target='_self' title="E-Mail Kontakt" >
            {renderRichText(contact.contact_email)}
          </a>
        </div>
      </div>
      <Image src='./images/icon.svg' alt="icon" title="devkid icon" width={120} height={68} className={styles.icon} ref={addLineRef}/>
    </div>
  );
}

 