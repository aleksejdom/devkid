import React, { useEffect, useRef } from 'react';
import styles from './Gradient_Box.module.scss';
import Text_Box from '../text_box/Text_Box'; 

export default function Gradient_Box({content}) {

    const roundBoxRef = useRef(null); 
    useEffect(() => { 
        const roundBoxElement = roundBoxRef.current;

        if (roundBoxElement) {
            const updatePosition = (e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.

                roundBoxElement.style.setProperty('--xPos', `${x}px`);
                roundBoxElement.style.setProperty('--yPos', `${y}px`);
            }

            roundBoxElement.addEventListener('mousemove', updatePosition);
 
            return () => {
                roundBoxElement.removeEventListener('mousemove', updatePosition);
            };
        }
    }, []);

    return ( 
      <div className={styles['header-second-box']}>
        <div className={styles['round-box']} ref={roundBoxRef}>
          <div className={styles['card-content']}>
            <Text_Box content={content} />
            <a href="mailto:mail@dev-kid.de" title='Kontakt'>Angebot Anfragen</a>
          </div>
        </div>
      </div>
    )
}

Gradient_Box.displayName = 'Gradient Box';