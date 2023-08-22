import React, { useState } from 'react';
import styles from './Text_Box.module.scss';

export default function Text_Box({ content, align, headline, cta, cta_text, read_more }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleClick = () => {
        setIsExpanded(prevState => !prevState);
    };

    const renderContent = () => {
        const elements = [];
        let listItems = [];

        if (read_more && !isExpanded) {
            content.some((item) => {
                switch(item.type) {
                    case "heading1":
                    case "heading2":
                    case "heading3":
                        const TagName = item.type.replace("heading", "h");
                        elements.push(<TagName key={item.type}>{item.text}</TagName>);
                        break;
                    case "paragraph":
                        elements.push(<p key={item.type}>{item.text}</p>);
                        return true; // breaks out of the some loop
                    default:
                        break;
                }
                return false; // continue with the loop
            });
        } else {
            content.forEach((item, index) => {
                if (item.type === "paragraph") {
                    const textSegments = [];
                    let lastEnd = 0;
                    item.spans.forEach((span, spanIndex) => {
                        textSegments.push(
                            <span key={spanIndex * 2}>
                                {item.text.substring(lastEnd, span.start)}
                            </span>
                        );
                        textSegments.push(
                            <strong key={spanIndex * 2 + 1}>
                                {item.text.substring(span.start, span.end)}
                            </strong>
                        );
                        lastEnd = span.end;
                    });
                    textSegments.push(<span key={textSegments.length}>{item.text.substring(lastEnd)}</span>);
                    elements.push(<p key={index}>{textSegments}</p>);
                } else if (["heading3", "heading2", "heading1"].includes(item.type)) {
                    const TagName = item.type.replace("heading", "h");
                    elements.push(<TagName key={index}>{item.text}</TagName>);
                } else if (item.type === "list-item") {
                    listItems.push(<li key={index}>{item.text}</li>);
                }

                if (item.type !== "list-item" && listItems.length > 0) {
                    elements.push(<ul key={`ul-${index}`}>{listItems}</ul>);
                    listItems = []; // Reset the list items
                }
            });
        }

        if (listItems.length > 0 && (isExpanded || !read_more)) {
            elements.push(<ul key={`ul-${content.length - 1}`}>{listItems}</ul>);
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
        <div className={`${styles.textBox} ${align ? styles[align] : ''} ${headline ? styles[headline] : ''}`} >
            {renderContent()}
            { cta && !isExpanded ? 
              <a href='mailto:mail:dev-kid.de?subject=DevKid' className="cta-button" title='Website'>{cta_text}</a> : '' 
            }
        </div>
    );
}

Text_Box.displayName = 'Text Box';