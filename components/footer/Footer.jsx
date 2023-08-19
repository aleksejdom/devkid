import React, { forwardRef, useRef } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = forwardRef(({footer}, ref) => { 
    return ( 
      <footer className={styles.footer} ref={ref}>
          <div className={styles.footerWrapper}>
            <div className={styles.footerContact}> 
              <h2>
                {footer[0].content[0].text}
              </h2>
              <a href={`tel:${footer[0].content[1].text}`} title='Telefon'>{footer[0].content[1].text}</a>
              <a href={`mailto:${footer[0].content[2].text}`} title='E-Mail'>{footer[0].content[2].text}</a>
            </div>
            <div className={styles.footerMenu}> 
              <ul className={styles.footerNav}>
                <li>
                  <Link href="/website-erstellen-lassen/was-kostet-eine-website" title='Kosten'>Wieviel kostet eine Website?</Link>
                </li>
                <li>
                  <Link href="/website-erstellen-lassen" title='Website erstellen lassen'>Website erstellen lassen</Link>
                </li>
              </ul>
              <ul className={styles.footerNav}>
                <li>
                  <Link href="/impressum" title='Impressum'>Impressum</Link>
                </li>
                <li>
                  <Link href="/datenschutz" title='Datenschutz'>Datenschutz</Link>
                </li>
              </ul>
            </div>
          </div>
         <div className={styles.aktion} >
          <span className={styles.aktionText}>
            {footer[0].aktion[0].text}
          </span> 
         </div>
      </footer>
  )
})

Footer.displayName = "Footer"; // Setzt den displayName auf "Footer"

export default Footer;