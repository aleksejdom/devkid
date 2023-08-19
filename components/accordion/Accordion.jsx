import React, { useState, useEffect } from 'react';
import styles from './Accordion.module.css';

export default function Accordion({ accordion }) {
  const [expandedItemIndex, setExpandedItemIndex] = useState(-1);

  const colors = ['#05473C', '#4A3170', '#7D0B32']; 
  const [colorIndex, setColorIndex] = useState(0);

  
  const handleItemClick = (index) => {
    setExpandedItemIndex(index === expandedItemIndex ? -1 : index);
  };
  // Change the color every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
    }, 4500);
    return () => clearInterval(timer);  
  }, []);

  return (
    <div className={styles.accordion} style={{ backgroundColor: colors[colorIndex] }}>
      <h2 className={styles.accordionTitle}>FAQs</h2>
      <div className={styles.accordionItems}>
      {accordion.map((item, index) => (
        <div
          className={`${styles.accordionItem} ${index === expandedItemIndex ? styles.expanded : ''}`}
          key={`accordion-0${index + 1}`}
        >
          <div className={styles.accordionHeader} onClick={() => handleItemClick(index)}>
            <h3>{item.accordion_title[0].text}</h3>
            <span className={index === expandedItemIndex ? styles.arrowUp : styles.arrowDown} />
          </div>
          {index === expandedItemIndex && (
            <div className={styles.accordionContent}>
              <p>{item.accordion_content[0].text}</p>
              {item.accordion_content[1] && <p>{item.accordion_content[1].text}</p>}
              {item.accordion_content[2] && <p dangerouslySetInnerHTML={{ __html:' <a href="' + item.accordion_content[2].spans[0].data.url + '">' + item.accordion_content[2].text.substring(item.accordion_content[2].spans[0].start, item.accordion_content[2].spans[0].end) + '</a>' }} />}
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}