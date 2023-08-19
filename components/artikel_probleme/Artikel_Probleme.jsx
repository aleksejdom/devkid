import React, { forwardRef, useState, useRef } from 'react';
import styles from './Artikel_Probleme.module.css'; 
import Image from 'next/image';

const Artikel_Probleme = forwardRef(({ artikel_probleme, artikel_probleme_headline }, ref) => {
  
  const [showFullText, setShowFullText] = useState(false);
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);
  const problemHeaderRef = useRef(null);
 
  const readMore = () => {
    setShowFullText(!showFullText);
  }

  const activeArticle = (index) => {
    setActiveArticleIndex(index);
    setShowFullText(false);

    if (problemHeaderRef.current) {
      problemHeaderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const getShortText = (text) => {
    return showFullText ? text : text.split(' ').slice(0, 25).join(' ') + '...';
  };

  function renderTextWithSpans(para) {
    let lastIndex = 0;
    const content = [];
    const shortenedText = getShortText(para.text);
    
    para.spans.forEach((span, index) => {
      const text = shortenedText.substring(lastIndex, span.start);
      if (text) {
        content.push(text);
      }
      
      const spanText = shortenedText.substring(span.start, span.end);
      if (span.type === 'strong') {
        content.push(<strong key={index}>{spanText}</strong>);
      }
  
      lastIndex = span.end;
    });
  
    const remainingText = shortenedText.substring(lastIndex);
    if (remainingText) {
      content.push(remainingText);
    }
  
    return content;
  }
 
  return (
    <div className={styles['artikel-probleme-box']} ref={problemHeaderRef}>
      <h2 ref={ref}>{artikel_probleme_headline[0]?.text || 'Default Headline'}</h2>
      <div className={styles['artikel-probleme-wrapper']} > 
        <div className={styles['artikel-content']}>
          {
            artikel_probleme.map((item, index) => {
              if (index === activeArticleIndex) {
                const headline = item.probleme_headline[0]?.text || '';
                const paragraphs = item.probleme_paragraph || [];
                const image = item.probleme_image || '';
                const probleme_items = item.probleme_items;
                return (
                  <React.Fragment key={index}>
                    <h3>{headline}</h3>
                    <div className={styles['problem-header']} >
                      <Image 
                        src={image.url} 
                        alt="arrow"
                        title={image.alt}   
                        width={430}
                        height={242}
                      />
                      <div className={styles['probleme-items']}>
                        <p><strong>Probleme</strong></p>
                        <ul>
                        {
                          probleme_items.map((item, index) => {
                            return (
                              <li key={index}>{item.text}</li>
                            )
                          })
                        }
                        </ul>
                      </div>
                    </div>
                    { 
                      paragraphs.map((para, paraIndex) => (
                        (showFullText || paraIndex === 0) && (
                          <p key={paraIndex}>
                            {renderTextWithSpans(para)}
                          </p>
                        )
                      ))
                    }
                    <button 
                      onClick={readMore}
                      className={showFullText ? styles['opened'] : ''}
                    >
                      {showFullText ? 'Zuklappen' : 'Aufklappen und mehr lesen'}
                    </button>
                  </React.Fragment>
                );
              }
              return null;
            })
          }
        </div>
        <div className={styles['more-articles']}>
          <p>Weitere Artikel</p>
          <div className={styles['more-articles-wrapper']}>
          {
            artikel_probleme.map((item, index) => {
              if (index !== activeArticleIndex) { 
                const probleme_items = item.probleme_items;
                const image = item.probleme_image || '';
                return (
                  <div className={styles['more-articles-item']} key={index}>
                    <div className={styles['more-articles-item-image']}>
                      <Image 
                        src={image.url} 
                        alt="arrow"
                        title={image.alt}   
                        width={150}
                        height={116}
                      />
                      <button onClick={() => activeArticle(index)}>Lesen</button>
                    </div>
                    <div className={styles['more-articles-probleme']}>
                      <p>Probleme</p>
                      <ul>
                        {
                          probleme_items.map((item, index) => {
                            return (
                              <li key={index}>{item.text}</li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                );
              }
              return null;
            })
          }
          </div>
        </div>
      </div>
    </div>
  );
});

export default Artikel_Probleme;