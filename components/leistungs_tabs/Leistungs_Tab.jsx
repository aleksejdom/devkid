import React, { forwardRef, useRef, useEffect } from 'react';
import styles from './Leistungs_Tab.module.scss';
import { RichText } from 'prismic-reactjs';
import { useState } from 'react';
import Image from 'next/image';
import { gsap } from "gsap";


const Leistungs_Tab = forwardRef(({tabs}, ref) => {
  const [selectedTab, setSelectedTab] = useState('Entwicklung');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  }
  const filteredTabs = tabs.filter(item => item.selection === selectedTab);

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
    <div className={styles['leistungs-tab']} ref={ref} >
      <div className={styles.header}>
        <h2 className={styles.icon} ref={addLineRef}>Leistungen</h2>
        <div className={styles['tab-tabs']}>
          <ul ref={addLineRef}>
            <li key={`Kreation`} onClick={() => handleTabClick('Kreation')} className={selectedTab === 'Kreation' ? styles.activeTab : ''}>Kreation</li>
            <li key={`Entwicklung`} onClick={() => handleTabClick('Entwicklung')} className={selectedTab === 'Entwicklung' ? styles.activeTab : ''}>Entwicklung</li>
          </ul>
        </div>
      </div>
      <div className={styles.tabsWarpper}>
        {filteredTabs.map((item, index) => {
          const imageContent = item.content.find(content => content.type === 'image');
          return (
            <div className={styles.tabsContent} key={`tab-0${index + 1}`}>
              {imageContent && 
                <Image 
                src={imageContent.url} 
                alt={imageContent.alt} 
                width={60}  // specify a width
                height={60} // specify a height
                layout="responsive"  // Makes image responsive
                ref={addLineRef}
                />
              }
              <RichText render={item.content.filter(content => content.type !== 'image')} />
            </div>
          );
        })}
      </div>
    </div>
  )
})

Leistungs_Tab.displayName = "Leistungs_Tab";

export default Leistungs_Tab; 