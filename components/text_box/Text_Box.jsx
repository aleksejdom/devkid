import React, { useState, useRef, useEffect } from 'react';
import styles from './Text_Box.module.scss';
import { gsap } from "gsap";

export default function Text_Box({ content, align, headline, cta, cta_text, black, read_more }) {
  const [isExpanded, setIsExpanded] = useState(false); 

  const boxRef = useRef(null);
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

  const handleToggleClick = () => {
    setIsExpanded(prevState => !prevState);
  };

  const renderContent = () => {
    const elements = [];
    let listItems = [];
  
    if (read_more && !isExpanded) {
      content.some((item, index) => {
        const TagName = item.type.replace("heading", "h");
        elements.push(<TagName key={`${item.type}-${index}`} ref={addLineRef}>{item.text}</TagName>);
        return item.type.startsWith("paragraph");
      });
    } else if (content) {
      content.forEach((item, index) => {
        const keyBase = `${item.type}-${index}`;
  
        if (item.type === "paragraph") {
          const textSegments = [];
          let lastEnd = 0;
  
          item.spans.forEach((span, spanIndex) => {
            const key = `${keyBase}-span-${spanIndex}`;
            textSegments.push(
              <span key={`${key}-text`}>
                {item.text.substring(lastEnd, span.start)}
              </span>
            );
            const linkKey = `${key}-link`;
            if (span.type === 'hyperlink') {
              textSegments.push(
                <a href={span.data.url} key={linkKey}>
                  {item.text.substring(span.start, span.end)}
                </a>
              );
            } else {
              textSegments.push(
                <strong key={linkKey}>
                  {item.text.substring(span.start, span.end)}
                </strong>
              );
            }
            lastEnd = span.end;
          });
          textSegments.push(<span key={`${keyBase}-last`}>{item.text.substring(lastEnd)}</span>);
          elements.push(<p key={keyBase}>{textSegments}</p>);
        } else if (["heading1", "heading2"].includes(item.type)) {
          const TagName = item.type.replace("heading", "h");
          elements.push(
            <span key={`${keyBase}-span`}>
              <TagName ref={addLineRef} className={styles['line']} key={keyBase}>
                {item.text}
              </TagName>
            </span>
          );
        } else if (["heading3"].includes(item.type)) {
          const TagName = item.type.replace("heading", "h");
          elements.push( 
            <TagName key={keyBase}>
              {item.text}
            </TagName> 
          );
        } else if (item.type === "list-item") {
          listItems.push(<li key={`${keyBase}-li`}>{item.text}</li>);
        }
      });
  
      if (listItems.length > 0) {
        elements.push(<ul key={`ul-${content.length}`}>{listItems}</ul>);
      }
    }

    if (read_more) {
      elements.push(
        <button 
          key="btn-toggle" 
          className={isExpanded ? styles['active'] : ""} 
          onClick={handleToggleClick}>
          {isExpanded ? "Zuklappen" : "Mehr anzeigen"}
        </button>
      );
    }

    return elements;
  };

  return (
    <div ref={boxRef} className={`${styles.textBox} ${align ? styles[align] : ''} ${headline ? styles[headline] : ''}`} >
      {renderContent()}
      { cta && !isExpanded ? 
        <a href='mailto:devkid.stgt@gmail.com?subject=DevKid' className={black ? styles['cta-button-black'] : styles['cta-button']} title='Website'>{cta_text}</a> : ''
      }
    </div>
  );
}

Text_Box.displayName = 'Text Box';