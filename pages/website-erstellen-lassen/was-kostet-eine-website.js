import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import home from '../../styles/Home.module.css'; // Pfad aktualisiert
import styles_kosten from '../../styles/WasKostetEineWebsite.module.css'; // Pfad aktualisiert
import Prismic from 'prismic-javascript';
import Footer from '../../components/footer/Footer'; // Pfad aktualisiert
import Link from 'next/link';
import Script from 'next/script';
import Calculation from '../../components/calculation/Calculation';

const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function WasKostetEineWebsite({footer, button, headerText, headerImage, calculation_content}) { 
    const footerRef = useRef(null);
    // Array of colors
    const colors = ['#05473C', '#4A3170', '#7D0B32']; 
    const [colorIndex, setColorIndex] = useState(0);
    const [isMenuOpen, setMenuOpen] = useState(false); 
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    // Change the color every 4 seconds
    useEffect(() => {
      const timer = setInterval(() => {
        setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
      }, 4500);
      return () => clearInterval(timer);  
    }, []); 

    // Funktion zum Scrollen zum Footer
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
        <title>Was kostet eine Website? » Homepage Kosten berechnen</title>
        <meta name="description" content="Wie viel Kostet es eine Website erstellen zu lassen? Jetzt Ihr Website Preis kostenlos berechnen lassen und Ihre professionelle Website anfragen."/>
        <meta name="keywords" content="Was kostet eine Website, Preise für Website, Wieviel kostet eine Website, Wo Website erstellen lassen, Wie viel kostet eine Homepage, Was kostet eine Homepage, Website Preise, Was kostet ein Webentwickler" />
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
          <div className={home.burgerMenu} onClick={toggleMenu}>☰</div>
          <ul className={isMenuOpen ? home.menuOpen : ''}>
            <Link href="/" title='Devkid'><Image src="/images/devkid_logo_white.svg" alt="icon" width={120} height={45} className={home.logo} title='Devkid logo'/></Link>
            <li><Link href='/website-erstellen-lassen' title='Website erstellen lassen'>Website erstellen lassen</Link></li>
            <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter} title="Rabatt Aktion">Sale 15% Rabatt</Link></li>
        </ul>
      </nav>

      <header className={home.header} style={{ backgroundColor: colors[colorIndex] }} >
        <div className={home.headlinebox}> 
          {headerText.map((item, index) => {
            if (item.type === "paragraph") {
              const textSegments = [];
              let lastEnd = 0;
              // Schleife durch die "spans" und teilt den Text entsprechend auf
              item.spans.forEach((span, spanIndex) => {
                // Füge den Text vor dem "strong" Teil hinzu
                textSegments.push(
                  <span key={spanIndex * 2}>
                    {item.text.substring(lastEnd, span.start)}
                  </span>
                );
                // Füge den "strong" Teil hinzu
                textSegments.push(
                  <strong key={spanIndex * 2 + 1}>
                    {item.text.substring(span.start, span.end)}
                  </strong>
                );
                lastEnd = span.end;
              });
              // Füge den Rest des Textes nach dem letzten "strong" Teil hinzu
              textSegments.push(<span key={textSegments.length}>{item.text.substring(lastEnd)}</span>); 
              return <p key={index}>{textSegments}</p>;
              } else if (item.type === "heading3") {
                return <h3 key={index}>{item.text}</h3>;
              } else if (item.type === "heading2") {
                return <h2 key={index}>{item.text}</h2>;
              } else if (item.type === "heading1") {
                return <h1 key={index}>{item.text}</h1>;
              }
              return null;
            })
          }
          <a href={`mailto:mail@dev-kid.de?subject=DevKid - Erstgespräch Anfrage`} className="cta-button" title='Erstgespräch'>Jetzt Erstgespräch anfragen.</a>
        </div>
        {headerImage ? 
          <div className={home.imagebox}>
            <Image src={headerImage.url} alt='website erstellen lassen' width={778} height={673} title='Website erstellen lassen'/> 
          </div> : null 
        }
        <div className={home.overlaybox}></div>   
      </header>

      <main className={styles_kosten["main-text"]}>
        <Calculation calculation_content={calculation_content} button={button}/>
      </main>

      <Footer footer={footer} ref={footerRef} />
      </>
    )
}

WasKostetEineWebsite.getInitialProps = async () => {
  const api = await Prismic.getApi(apiEndpoint)
  const res = await api.query(Prismic.Predicates.at('document.type', 'homepage'))
  const wasKostetEineWebsite_res = await api.query(Prismic.Predicates.at('document.type', 'was_kostet_websit'))

  const document = res.results[0] 
  const wasKostetEineWebsite_document = wasKostetEineWebsite_res.results[0]

  let buttonLink = '';
  if (document.data.button && document.data.button.url) {
    buttonLink = document.data.button.url;
  }
  
  return {
    button: buttonLink,
    button_text : document.data.link_text, 
    footer : document.data.footer,
    headerText : wasKostetEineWebsite_document.data.header,
    headerImage : wasKostetEineWebsite_document.data.headerimage,
    calculation_content : wasKostetEineWebsite_document.data.calculation_content,
  }
}

export default WasKostetEineWebsite