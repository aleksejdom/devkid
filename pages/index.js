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


// Prismic API Endpunkt
const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function Home({ title, subline, paragraph, button, button_text, tabs, contact, usp, referenzen, referenzenContent, footer, accordion }) {
  const videoRef = useRef(null);
  const headerRef = useRef(null);
  // Array of colors
  const colors = ['#05473C', '#4A3170', '#7D0B32'];
  // State for the current color
  const [colorIndex, setColorIndex] = useState(0);

  const leistungsTabRef = useRef(null);
  const footerRef = useRef(null);

  // Funktion zum Scrollen zum Leistungs_Tab
  const scrollToLeistungsTab = () => {
    if (leistungsTabRef.current) {
      leistungsTabRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Funktion zum Scrollen zum Footer
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          videoRef.current.src = "./videos/clip_center_comp.m4v";
          videoRef.current.load();
          observer.disconnect();
        }
      });
    });

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

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
        if (entry.isIntersecting) {
          videoRef.current.src = "./videos/clip_center_comp.m4v";
          videoRef.current.load();
          videoRef.current.play().catch(error => console.error('Video play failed:', error));
        } else {
          videoRef.current.pause();
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
      <Head>
        <title>Dev-Kid | Design und Webentwicklung</title>
        <meta name="description" content="Ist Ihnen eine Digitalagentur zu teuer? Als Freelancer bin ich spezialisiert auf Webentwicklung, User Experience (UX) Design und der Erstellung beeindruckender 3D-Welten und Strategien."/>
        <meta name="keywords" content="Digitalagentur Stuttgart, Webdesign, Online Marketing, SEO, Webentwicklung, digitale Strategien, moderne Webseiten, React Anwendungen, VR Entwicklung, VR Video, AR Entwicklung, Virtual Reality Technologie, Programmierung von Webseiten, 3D Modellierung, 3D Visualisierung, Grafikdesign, Webseite Preisvergleich, VR Anwendung, 360 Grad Video, kreative Webseiten, 3D im Web" />
        <meta name="robots" content="index, follow" />
        <script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/f38bad507948038fa664f720/script.js"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <ul>
          <li><Link href="/">Startseite</Link></li>
          <li><Link href="#leistungs-tab" onClick={scrollToLeistungsTab}>Leistungen</Link></li>
          <li><Link href={`${button}?subject=Dev-Kid - Anfrage`}>Kontakt</Link></li>
          <li className='aktion'><Link href="#footer" onClick={scrollToFooter}>Aktion</Link></li>
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
          <a href={`${button}?subject=Dev-Kid - Anfrage`} className="cta-button"> {RichText.asText(button_text)} </a>
        </div>

        <div className={styles.videobox}>
          <video ref={videoRef} autoPlay muted loop ></video>
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
