import React, { forwardRef, useRef } from 'react';
import styles from './Footer.module.css';

const Footer = forwardRef(({footer}, ref) => { 
    return ( 
      <footer className={styles.footer} ref={ref}>
          <div className={styles.footerWrapper}>
            <div className={styles.footerContact}> 
              <h4>
                {footer[0].content[0].text}
              </h4>
              <a href={`tel:${footer[0].content[1].text}`}>{footer[0].content[1].text}</a>
              <a href={`mailto:${footer[0].content[2].text}`}>{footer[0].content[2].text}</a>
            </div>
            <ul className={styles.footerNav}>
              <li>
                <a href="/impressum">Impressum</a>
              </li>
              <li>
                <a href="/datenschutz">Datenschutz</a>
              </li>
            </ul>
          </div>
         <div className={styles.aktion} >
          <span className={styles.aktionText}>
            {footer[0].aktion[0].text}  --  JETZT ZUSCHLAGEN!
          </span> 
         </div>
      </footer>
  )
})

export default Footer;
