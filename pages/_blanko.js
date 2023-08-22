import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image' 
import home from '../styles/Home.module.css';  
import styles_wordpress_website_erstellen_lassen from '../styles/WordpressWebsiteErstellenLassen.module.css'
import Prismic from 'prismic-javascript'
import Footer from '../components/footer/Footer' 
import Link from 'next/link';
import Script from 'next/script' 
import Text_Box from '../components/text_box/Text_Box';

const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function WordpressWebsiteErstellenLassen({footer, headline, headerParagraph }) {  
    const footerRef = useRef(null); 
    const colors = ['#05473C', '#4A3170', '#7D0B32']; 
    const [colorIndex, setColorIndex] = useState(0);

    const [isMenuOpen, setMenuOpen] = useState(false); 
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    const menuClasses = `${home.burgerMenu} ${isMenuOpen ? home.open : ''}`;
    /* const ablaufRef = useRef(null); */
 
    useEffect(() => {
      const timer = setInterval(() => {
        setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
      }, 4500);
      return () => clearInterval(timer);  
    }, []); 

    /* const scrollToLeistungsTab = () => {
      if (leistungsoverviewRef.current) {
        leistungsoverviewRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    }; */
 
    const scrollToFooter = () => {
      if (footerRef.current) {
        footerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }; 
  

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
          <title>Wordpress Website erstellen lassen » Kreative Websites für Ihr Unternehmen</title>
          <meta name="description" content=""/>
          <meta name="keywords" content="Wordpress Website erstellen lassen" />
          <meta name="google-site-verification" content="LML3tjqodXK6Ngu6TbcYkSz3LXB-AmQdruPA5dEN1B0" />
          <meta name="robots" content="index, follow" />

          <link rel="shortcut icon" type="image/png" href="https://dev-kid.de/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="https://dev-kid.de/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="https://dev-kid.de/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="https://dev-kid.de/favicon-16x16.png" />
          
          <link rel="manifest" href="https://dev-kid.de/site.webmanifest" />
          <link rel="mask-icon" href="https://dev-kid.de/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <nav className={home.navbar}> 
          <div className={menuClasses} onClick={toggleMenu}></div>
          <ul className={isMenuOpen ? home.menuOpen : ''}>
            <Link href="/" title='DevKid'><Image src="/images/devkid_logo_white.svg" alt="icon" title="Devkid Logo" width={120} height={45} className={home.logo} /></Link>
            {/* <li><Link href="#Ablauf" title='Ablauf' onClick={scrollToAblauf}>In 6 Schritten zur Website</Link></li>  */} 
            <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter} title="Rabatt Aktion">Sale 15% Rabatt</Link></li>
          </ul>
        </nav>

        <header className={home.header} style={{ backgroundColor: colors[colorIndex] }} > 
          <div className={home.headlinebox}>
            <Text_Box comClass={home} headline={headline} headerParagraph={headerParagraph} />
          </div> 
          <div className={home.overlaybox}></div>
        </header>

        <main className={styles_wordpress_website_erstellen_lassen["main-text"]}> 
           Test
        </main>

        <Footer footer={footer} ref={footerRef} />
      </>
    )
}

WordpressWebsiteErstellenLassen.getInitialProps = async () => {
  const api = await Prismic.getApi(apiEndpoint)
  const res = await api.query(Prismic.Predicates.at('document.type', 'homepage'))
  const resWordpressWebsite = await api.query(Prismic.Predicates.at('document.type', 'wordpress_website_erstellen_lassen'))
   
  const document = res.results[0] 
  const documentWordpressWebsite = resWordpressWebsite.results[0]  
 
  let buttonLink = '';
  if (document.data.button && document.data.button.url) {
    buttonLink = document.data.button.url;
  }
  
  return { 
    button: buttonLink,
    button_text : document.data.link_text,
    footer : document.data.footer,
    headline : documentWordpressWebsite?.data.headline,
    headerParagraph : documentWordpressWebsite?.data.headerParagraph,
  }
}

export default WordpressWebsiteErstellenLassen;