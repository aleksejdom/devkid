import React, { useState, useRef, useEffect } from 'react';
import styles from './Text_Box.module.scss';
import { gsap } from "gsap";

export default function Text_Box({ origin, content, align, headline, cta, cta_text, black, read_more, title }) {
  const [isExpanded, setIsExpanded] = useState(false); 

  const boxRef = useRef(null);
  
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
              scale: `${origin ? 1 : 0.7}`,
              transformOrigin: `${origin ? origin : 'left'} top`,
              ease: "sine.out"
            },
            {
              delay: index * 0.1,
              duration: 1.6,
              y: 0,
              ease: "power3.out",
              opacity: 1,
              scale: 1,
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

  const handleToggleClick = () => {
    setIsExpanded(prevState => !prevState);
  };

  const renderContent = () => {
    const elements = [];
    let listItems = [];
  
    if (read_more && !isExpanded) {
      for (let index = 0; index < content.length; index++) {
        const item = content[index];
        let TagName;
    
        if (item.type === "heading1") {
          TagName = "h1";
        } else if (item.type === "heading2") {
          TagName = "h2";
        } else if (item.type === "heading3") {
          TagName = "h3";
        } else if (item.type === "paragraph") {
          TagName = "p";
          elements.push(
            <p key={`paragraph-${index}`} ref={addLineRef}>{item.text}</p>
          );
          break;  // Beenden Sie die Schleife, wenn Sie einen Paragraphen erreichen
        } else {
          continue;  // Überspringen Sie alle anderen Typen
        }
    
        elements.push(
          <TagName key={`${item.type}-${index}`} ref={addLineRef} >{item.text}</TagName>
        );
      }
    } else if (content) {
      content.forEach((item, index) => {
        const keyBase = `${item.type}-${index}`;
  
        if (item.type === "paragraph") {
          const textSegments = [];
          let lastEnd = 0;
  
          item.spans.forEach((span, spanIndex) => {
            const key = `${keyBase}-span-${spanIndex}`;
            textSegments.push(
              <span key={`${key}-text`} ref={addLineRef}>
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
          textSegments.push(
            <span key={`${keyBase}-last`} >{item.text.substring(lastEnd)}</span>
          );
          elements.push(
            <p key={keyBase} ref={addLineRef}>{textSegments}</p>
          );
        } else if (["heading1", "heading2"].includes(item.type)) {
          const TagName = item.type.replace("heading", "h");
          elements.push( 
            <TagName className={`${styles['line']}`} key={keyBase} ref={addLineRef}>
              {item.text}
            </TagName> 
          );
        } else if (["heading3"].includes(item.type)) {
          const TagName = item.type.replace("heading", "h");
          elements.push( 
            <TagName key={keyBase} ref={addLineRef} >
              {item.text}
            </TagName> 
          );
        } else if (item.type === "list-item") {
          listItems.push(
            <li key={`${keyBase}-li`}>{item.text}</li>
          );
        }
      });
  
      if (listItems.length > 0) {
        elements.push(<ul key={`ul-${content.length}`} ref={addLineRef}>{listItems}</ul>);
      }
    }

    if (read_more) {
      elements.push(
        <button 
          ref={addLineRef}
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
        <a href='mailto:devkid.stgt@gmail.com?subject=DevKid' className={black ? styles['cta-button-black'] : styles['cta-button']} title='Website' ref={addLineRef}>{cta_text}</a> : ''
      }
    </div>
  );
}

Text_Box.displayName = 'Text Box';