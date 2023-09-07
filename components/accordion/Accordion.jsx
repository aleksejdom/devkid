import React, { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css';
import { gsap } from "gsap";

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
  }, [colors.length]);

  const renderContentWithSpans = (content) => {
    if (!content.spans || content.spans.length === 0) {
      return <p>{content.text}</p>;
    }
  
    let renderedContent = [];
    let lastIndex = 0;
  
    content.spans.forEach((span, sIndex) => {
      if (span.start > lastIndex) {
        renderedContent.push(<span key={`span-${sIndex}`}>{content.text.substring(lastIndex, span.start)}</span>);
      }
      
      if (span.type === 'strong') {
        renderedContent.push(<strong key={`strong-${sIndex}`}>{content.text.substring(span.start, span.end)}</strong>);
      } else if (span.type === 'hyperlink') {
        renderedContent.push(<a href={span.data.url} key={`link-${sIndex}`}>{content.text.substring(span.start, span.end)}</a>);
      }
  
      lastIndex = span.end;
    });
  
    if (lastIndex < content.text.length) {
      renderedContent.push(<span key={`span-last`}>{content.text.substring(lastIndex)}</span>);
    }
  
    return renderedContent;
  }

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
    <div className={styles.accordion} style={{ backgroundColor: colors[colorIndex] }}>
      <h2 className={styles.accordionTitle} ref={addLineRef}>FAQs</h2>
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
                  {item.accordion_content.map((content, cIndex) => {
                    if (content.type === 'o-list-item') {
                      return <ol key={`olist-${cIndex}`}>{renderContentWithSpans(content)}</ol>;
                    } else if (content.type === 'link') {
                      return <p key={`link-${cIndex}`} dangerouslySetInnerHTML={{ __html: '<a href="' + content.spans[0].data.url + '">' + content.text.substring(content.spans[0].start, content.spans[0].end) + '</a>' }} />;
                    } else {
                      return <p key={`p-${cIndex}`}>{renderContentWithSpans(content)}</p>;
                    }
                  })}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

Accordion.displayName = 'Accordion';