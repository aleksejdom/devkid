import React, { forwardRef, useRef } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

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
                <Link href="/impressum"><a>Impressum</a></Link>
              </li>
              <li>
                <Link href="/datenschutz"><a>Datenschutz</a></Link>
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

Footer.displayName = "Footer"; // Setzt den displayName auf "Footer"

export default Footer;