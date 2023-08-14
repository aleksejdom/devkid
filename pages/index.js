import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import Leistungs_Tab from '../components/leistungs_tabs/Leistungs_Tab';
import Contact_Box from '../components/contact_box/Contact_Box';
import Usp_Box from '../components/usp_box/Usp_Box';
import Referenzen_Box from '../components/referenzen_box/Referenzen_Box';
import Footer from '../components/footer/Footer';
import Accordion from '../components/accordion/Accordion';
import Link from 'next/link';
import Script from 'next/script'


// Prismic API Endpunkt
const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function Home({ title, subline, paragraph, button, button_text, tabs, contact, usp, referenzen, referenzenContent, footer, accordion }) {
  const videoRef = useRef(null);
  const headerRef = useRef(null); 
  const colors = ['#05473C', '#4A3170', '#7D0B32']; 
  const [colorIndex, setColorIndex] = useState(0);

  const [isMenuOpen, setMenuOpen] = useState(false); 
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const leistungsTabRef = useRef(null);
  const footerRef = useRef(null);
 
  const scrollToLeistungsTab = () => {
    if (leistungsTabRef.current) {
      leistungsTabRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }; 

  // Change the color every 4 seconds
  useEffect(() => {
      const timer = setInterval(() => {
        setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
      }, 4500);
      return () => clearInterval(timer);  
  }, []);

  //Video
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) { // Überprüfen, ob videoRef.current existiert
          if (entry.isIntersecting) {
            // Load and play the video when it becomes visible
            videoRef.current.load();
            videoRef.current.play().catch(error => console.error('Video play failed:', error));
          } else {
            videoRef.current.pause();
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
  
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
  
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);
    
  return (
    <>
      <Script id="cookieyes" src="https://cdn-cookieyes.com/client_data/f38bad507948038fa664f720/script.js" strategy="beforeInteractive" />
      <Script id="tagmanager" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-960RQQPD73" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-960RQQPD73');
        `}
      </Script>

      <Head>
        <title>Website erstellen lassen in Stuttgart - Webdesign und Mehr.</title>
        <meta name="description" content="Sie möchten eine Website erstellen lassen und online erfolgreich durchzustarten? Als Experte in den Bereichen Website Konzeption, Webdesign und Website Erstellung bin ich der ideale Partner."/>
        <meta name="keywords" content="Website erstellen lassen, Digitalagentur Stuttgart, Webdesign, 360 Grad Videoproduktion" />
        <meta name="google-site-verification" content="LML3tjqodXK6Ngu6TbcYkSz3LXB-AmQdruPA5dEN1B0" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://dev-kid.de/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://dev-kid.de/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://dev-kid.de/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://dev-kid.de/favicon-16x16.png" />
        <link rel="manifest" href="https://dev-kid.de/site.webmanifest"></link>
      </Head>

      <nav className={styles.navbar}> 
        <div className={styles.burgerMenu} onClick={toggleMenu}>☰</div>
        <ul className={isMenuOpen ? styles.menuOpen : ''}>
          <Link href="/"><Image src="/images/devkid_logo_white.svg" alt="icon" width={120} height={45} className={styles.logo} /></Link>
          <li><Link href="#leistungen" onClick={scrollToLeistungsTab}>Leistungen</Link></li>
          <li><Link href="/website-erstellen-lassen">Website erstellen lassen</Link></li>
          <li><Link href="/website-erstellen-lassen/was-kostet-eine-website">Kosten</Link></li>
          <li><Link href={`${button}?subject=DevKid - Website erstellen lassen`}>Kontakt</Link></li>
          <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter}>Rabatt 15%</Link></li>
        </ul>
      </nav>

      <header className={styles.header} style={{ backgroundColor: colors[colorIndex] }} ref={headerRef}> 
        <div className={styles.headlinebox}>
          <h1>{RichText.asText(title)}</h1>
          <p className='subline'>
            {RichText.asText(subline)}
          </p>
          <div className={styles.textbox}>
            <p>
            {RichText.asText(paragraph)}
            </p>  
          </div>
          <a href={`${button}?subject=DevKid - Website erstellen lassen`} className="cta-button"> {RichText.asText(button_text)} </a>
        </div> 

        <div className={styles.videobox}>
          <video ref={videoRef} autoPlay muted loop playsInline>
            <source src="./videos/clip_center_comp.m4v" type="video/mp4" />
            <source src="./videos/clip_center_comp.webm" type="video/webm" />
          </video>
          <Image src="./images/icon.svg" alt="icon" width={120} height={68} className={styles.icon} />
        </div> 

        <div className={styles.overlaybox}></div>
      </header>
       
      <main className={styles.main}>
        <Leistungs_Tab tabs={tabs} id="leistungs-tab" ref={leistungsTabRef}/>
        <Contact_Box contact={contact} button={button}/>
        <Usp_Box usp={usp}/>
        <Referenzen_Box referenzen={referenzen} referenzenContent={referenzenContent} />
        <Accordion accordion={accordion} />
      </main>

      <Footer footer={footer} id="footer" ref={footerRef} />
    </>
  )
}

Home.getInitialProps = async () => {
  const api = await Prismic.getApi(apiEndpoint)
  const res = await api.query(Prismic.Predicates.at('document.type', 'homepage'))
  const document = res.results[0]

  let buttonLink = '';
  if (document.data.button && document.data.button.url) {
    buttonLink = document.data.button.url;
  }
 
  return {
    title: document.data.title,
    subline: document.data.subline,
    paragraph: document.data.paragraph,
    button: buttonLink,
    button_text : document.data.link_text,
    tabs : document.data.tabs,
    contact : document.data.contact[0],
    usp : document.data.usp,
    referenzen : document.data.referenzen,
    referenzenContent : document.data.referenz_content,
    footer : document.data.footer,
    accordion : document.data.accordion
  }
}

export default Home