import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image' 
import home from '../styles/Home.module.css'; // Pfad aktualisiert
import styles_website_erstellen_lassen from '../styles/WebsiteErstellenLassen.module.css'
import Prismic from 'prismic-javascript'
import Footer from '../components/footer/Footer' 
import Link from 'next/link';
import Script from 'next/script'
import Referenzen_Box from '../components/referenzen_box/Referenzen_Box';
import Projekt_Ablauf from '../components/projekt_ablauf/Projekt_Ablauf';
import Leistungsoverview from '../components/leistungs_overview/Leistungsoverview';

const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function WebsiteErstellenLassen({button, footer, referenzen, preis_content, referenzenContent, headline, headerParagraph, headerImage, introText, listItems, projekt_ablauf_items, leistungsoverview_items, leistungsoverview_title}) { 
    const headerRef = useRef(null);
    const footerRef = useRef(null); 
    const colors = ['#05473C', '#4A3170', '#7D0B32']; 
    const [colorIndex, setColorIndex] = useState(0);

    const [isMenuOpen, setMenuOpen] = useState(false); 
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    const menuClasses = `${home.burgerMenu} ${isMenuOpen ? home.open : ''}`;
    const leistungsoverviewRef = useRef(null);
    const referenzenRef = useRef(null);
    const kostenRef = useRef(null);
    const ablaufRef = useRef(null);

    
 
    useEffect(() => {
      const timer = setInterval(() => {
        setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
      }, 4500);
      return () => clearInterval(timer);  
    }, []); 

    const scrollToLeistungsTab = () => {
      if (leistungsoverviewRef.current) {
        leistungsoverviewRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };

    const scrollToReferenzen = () => {
      if (referenzenRef.current) {
        referenzenRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };
    
    const scrollToKosten = () => {
      if (kostenRef.current) {
        kostenRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };

    const scrollToAblauf = () => {
      if (ablaufRef.current) {
        ablaufRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };

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
          <title>Website erstellen lassen » Kreative Websites für Ihr Unternehmen</title>
          <meta name="description" content="Möchten Sie eine Website erstellen lassen? Als führende Experten für Webdesign und Webentwicklung in Stuttgart bieten wir maßgeschneiderte Lösungen an."/>
          <meta name="keywords" content="Website erstellen lassen, Webentwicklung, Website design, Webdesign erstellen lassen, Homepage erstellen lassen, Internetseite erstellen lassen, Webdesign für Ärtzte, kreative Website erstellen lassen, Wordpress Website erstellen lassen, Firmenwebsite erstellen lassen, Unternehmenswebsite erstellen lassen" />
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
            <li><Link href="#Ablauf" title='Ablauf' onClick={scrollToAblauf}>In 6 Schritten zur Website</Link></li> 
            <li><Link href="#Leistungen" title='Leistungen' onClick={scrollToLeistungsTab}>Leistungen</Link></li> 
            <li><Link href="#Kosten" title='Kosten' onClick={scrollToKosten}>Kosten</Link></li> 
            <li><Link href="#Referenzen" title='Referenzen' onClick={scrollToReferenzen}>Referenzen</Link></li> 
            <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter} title="Rabatt Aktion">Sale 15% Rabatt</Link></li>
          </ul>
        </nav>

        <header className={home.header} style={{ backgroundColor: colors[colorIndex] }} > 
          <div className={home.headlinebox}>
            {headline && headline[0] && headline[0].text ? <h1>{headline[0].text}</h1> : null}
            <div className={home.textbox}> 
              {headerParagraph ? headerParagraph.map((paragraph, index) => {
                const textSegments = [];
                let lastEnd = 0;
                // Schleife durch die "spans" und teilt den Text entsprechend auf
                paragraph.spans.forEach((span, spanIndex) => {
                  // Füge den Text vor dem "strong" Teil hinzu
                  textSegments.push(
                    <span key={spanIndex * 2}>
                      {paragraph.text.substring(lastEnd, span.start)}
                    </span>
                  );
                  // Füge den "strong" Teil hinzu
                  textSegments.push(
                    <strong key={spanIndex * 2 + 1}>
                      {paragraph.text.substring(span.start, span.end)}
                    </strong>
                  );
                  lastEnd = span.end;
                });
                // Füge den Rest des Textes nach dem letzten "strong" Teil hinzu
                textSegments.push(<span key={textSegments.length}>{paragraph.text.substring(lastEnd)}</span>);

                return <p key={index}>{textSegments}</p>;
              }) : null}
            </div>
            <div className={styles_website_erstellen_lassen["list-box"]}>
              <ul>
                {listItems.map((box, index) => (
                  <li key={index}>{box.item[0].text}</li>
                ))}
              </ul>
            </div>
            {button ? <a href={`${button}?subject=DevKid - Website erstellen lassen`} className="cta-button" title='Website erstellen lassen'>Jetzt Ihre eigene, professionelle Website erstellen lassen</a> : null}  
          </div>
          {headerImage ? 
              <div className={home.imagebox}>
                <Image src='/images/vector_head.png' alt='website erstellen lassen' title="aleksej domovec" width={778} height={673}/> 
              </div> : null 
          }   
          <div className={home.overlaybox}></div>
        </header>

        <main className={styles_website_erstellen_lassen["main-text"]}>
          <Projekt_Ablauf projekt_ablauf_items={projekt_ablauf_items} button={button} ref={ablaufRef}/>
          <Leistungsoverview leistungsoverview_items={leistungsoverview_items} leistungsoverview_title={leistungsoverview_title} ref={leistungsoverviewRef}/>
          <div className={styles_website_erstellen_lassen["kosten-overview"]} ref={kostenRef}>
            {preis_content.map((item, index) => {
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
            })}
            <a href={`/website-erstellen-lassen/was-kostet-eine-website`} className={styles_website_erstellen_lassen["cta-button"]} title='Kosten'>Zur Preisberechnung</a>
          </div>
          <div className={styles_website_erstellen_lassen["text-box"]}>
            {introText && introText.map((item, index) => {
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
            })}
            <a href={`mailto:mail@dev-kid.de?subject=DevKid - Website erstellen lassen`} className={styles_website_erstellen_lassen['cta-button-transparent']} title='Kontakt'>Jetzt Kontakt aufnehmen</a>

          </div>
          <Referenzen_Box referenzen={referenzen} referenzenContent={referenzenContent} ref={referenzenRef}/>
        </main>

        <Footer footer={footer} ref={footerRef} />
      </>
    )
}

WebsiteErstellenLassen.getInitialProps = async () => {
  const api = await Prismic.getApi(apiEndpoint)
  const res = await api.query(Prismic.Predicates.at('document.type', 'homepage'))
  const resWebsiteErstellenLassen = await api.query(Prismic.Predicates.at('document.type', 'website_erstellen_lassen'))
  const resProjektAblauf = await api.query(Prismic.Predicates.at('document.type', 'projekt_ablauf'));
  const resLeisstungsOverview = await api.query(Prismic.Predicates.at('document.type', 'leistungs_overview'));
  
  const document = res.results[0] 
  const documentWebsiteErstellenLassen = resWebsiteErstellenLassen.results[0]
  const documentProjektAblauf = resProjektAblauf.results[0]; 
  const documentLeistungsOverview = resLeisstungsOverview.results[0];
 
  let buttonLink = '';
  if (document.data.button && document.data.button.url) {
    buttonLink = document.data.button.url;
  }
  
  return { 
    button: buttonLink,
    button_text : document.data.link_text,
    footer : document.data.footer,
    preis_content : documentWebsiteErstellenLassen.data.preis_content, 
    referenzen : documentWebsiteErstellenLassen.data.referenzen,
    referenzenContent : documentWebsiteErstellenLassen.data.referenz_content,
    headline : documentWebsiteErstellenLassen.data.headline,
    headerParagraph : documentWebsiteErstellenLassen.data.headerparagraph,
    headerImage : documentWebsiteErstellenLassen.data.headerimage,
    introText : documentWebsiteErstellenLassen.data.intro,
    listItems : documentWebsiteErstellenLassen.data.list_box,
    projekt_ablauf_items : documentProjektAblauf.data.projekt_ablauf,
    leistungsoverview_items : documentLeistungsOverview.data.leistung,
    leistungsoverview_title : documentLeistungsOverview.data.title,
  }
}

export default WebsiteErstellenLassen