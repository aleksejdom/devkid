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
import Artikel_Probleme from '../components/artikel_probleme/Artikel_Probleme';


// Prismic API Endpunkt
const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function Home({ title, subline, paragraph, button, button_text, tabs, contact, usp, referenzen, referenzenContent, footer, accordion, artikel_probleme, artikel_probleme_headline }) {
  const videoRef = useRef(null);
  const headerRef = useRef(null); 
  const colors = ['#05473C', '#4A3170', '#7D0B32']; 
  const [colorIndex, setColorIndex] = useState(0);

  const [isMenuOpen, setMenuOpen] = useState(false); 
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  }; 

  const menuClasses = `${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`;
  const leistungsTabRef = useRef(null);
  const loesungsRef = useRef(null);
  const footerRef = useRef(null);
  const referenzenRef = useRef(null);
 
  const scrollToLeistungsTab = () => {
    if (leistungsTabRef.current) {
      leistungsTabRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu();
  }; 
  const scrollToLoesungen = () => {
    if (loesungsRef.current) {
      loesungsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu();
  } 
  const scrollToReferenzen = () => {
    if (referenzenRef.current) {
      referenzenRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu();
  } 
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu();
  }; 

  useEffect(() => {
    const currentHeader = headerRef.current;

    const handleScroll = () => {
        // Some logic involving currentHeader
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        if (currentHeader) {
            // Cleanup logic involving currentHeader
            window.removeEventListener('scroll', handleScroll);
        }
    };
  }, []);

  // Change the color every 4 seconds
  useEffect(() => {
      const timer = setInterval(() => {
        setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
      }, 4500);
      return () => clearInterval(timer);  
  }, [colors.length]);

  //Video
  useEffect(() => {
    const currentHeader = headerRef.current;
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
  
    if (currentHeader) {
      observer.observe(currentHeader);
    }
  
    return () => {
      if (currentHeader) {
        observer.unobserve(currentHeader);
      }
    };
  }, []);
    
  return (
    <> 
      <Head>
        <title>Website erstellen lassen - schnell, modern, aus Leidenschaft</title>
        <meta name="description" content="Nur einen Klick entfernt zur Ihrer Traum-Website! Lassen Sie sich von uns Ihre professionelle Website erstellen – mit schönem und ansprechendem Webdesign"/>
        <meta name="keywords" content="Website erstellen lassen, Digitalagentur Stuttgart, Webdesign, Homepage erstellen lassen, Internetseite erstellen lassen, Webagentur Stuttgart, modernes Website Design erstellen lassen, Wordpress Website erstellen lassen, Nextjs Website erstellen lassen" />
         
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Service",
            "name": "Devkid Website Erstellung",
            "serviceType": "Website Erstellung und Design",
            "provider": {
              "@type": "Organization",
              "name": "DevKid",
              "address": {
                "@type": "PostalAddress", 
                "addressLocality": "Stuttgart", 
                "addressCountry": "DE"
              },
              "telephone": "+4915906372543"
            },
            "areaServed": "Weltweit",
            "description": "Nur einen Klick entfernt zur Ihrer Traum-Website! Lassen Sie sich von uns Ihre professionelle Website erstellen",
            "priceRange": "€500 - €5000",
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://www.dev-kid.de"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Person",
            "name": "Aleksej Domovec",
            "jobTitle": "Website Entwickler und Digital Designer",
            "url": "https://www.dev-kid.de",
            "sameAs": [
              "https://www.linkedin.com/in/aleksej-domovec-355462177/",
              "https://dev-kid.de"
              // ... weitere Links
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Stuttgart",
              "addressRegion": "Baden Württemberg",
              "postalCode": "70378",
              "addressCountry": "Deutschland"
            }
            // Fügen Sie weitere Details wie E-Mail oder Telefonnummer hinzu, falls gewünscht
          })}
        </script>
      </Head>

      <nav className={styles.navbar}> 
        <div className={menuClasses} onClick={toggleMenu}></div>
        <ul className={isMenuOpen ? styles.menuOpen : ''}>
          <Link href="/" title='DevKid'><Image src="/images/devkid_logo_white.svg" alt="icon" title="Devkid Logo" width={120} height={45} className={styles.logo} /></Link>
          <li><Link href="#leistungen" onClick={scrollToLeistungsTab} title='Leistungen'>Leistungen</Link></li> 
          <li><Link href="#Referenzen" onClick={scrollToReferenzen} title='Referenzen'>Referenzen</Link></li> 
          <li><Link href="#Probleme&Loesungen" onClick={scrollToLoesungen} title='Lösungen'>Lösungen</Link></li>
          <li><Link href="/wordpress-website-erstellen-lassen" title='WordPress Website'>WordPress</Link></li>    
          <li className='whatsapp'><Link href="https://wa.me/15906372543" title="WhatsApp">Chat on WhatsApp</Link></li>
          <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter} title="Rabatt Aktion">Sale 15% Rabatt</Link></li>
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
          <a href={`${button}?subject=DevKid - Website erstellen lassen`} className="cta-button" title='Website'> {RichText.asText(button_text)} </a>
        </div> 

        <div className={styles.videobox}>
          <video ref={videoRef} autoPlay muted loop playsInline>
            <source src="./videos/clip_center_comp.m4v" type="video/mp4" />
            <source src="./videos/clip_center_comp.webm" type="video/webm" />
          </video>
          <Image src="./images/icon.svg" alt="icon" title="devkid icon" width={120} height={68} className={styles.icon} />
        </div> 

        <div className={styles.overlaybox}></div>
      </header>
       
      <main className={styles.main}>
        <Leistungs_Tab tabs={tabs} id="leistungs-tab" ref={leistungsTabRef}/>
        <Contact_Box contact={contact} button={button}/>
        <Usp_Box usp={usp}/>
        <Referenzen_Box referenzen={referenzen} referenzenContent={referenzenContent} ref={referenzenRef} />
        <Artikel_Probleme artikel_probleme={artikel_probleme} artikel_probleme_headline={artikel_probleme_headline} ref={loesungsRef} />
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
    accordion : document.data.accordion,
    artikel_probleme : document.data.artikel_probleme,
    artikel_probleme_headline : document.data.artikel_probleme_headline,
  }
}

export default Home