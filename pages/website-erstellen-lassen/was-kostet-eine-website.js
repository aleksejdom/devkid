import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import home from '../../styles/Home.module.scss'; // Pfad aktualisiert 
import Prismic from 'prismic-javascript';
import { gsap } from "gsap";
import Footer from '../../components/footer/Footer'; // Pfad aktualisiert
import Link from 'next/link'; 
import Calculation from '../../components/calculation/Calculation';
import Text_Box from '../../components/text_box/Text_Box';

const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function WasKostetEineWebsite({footer, button, headerText, headerImage, calculation_content}) { 
    const footerRef = useRef(null); 
    const colors = ['#05473C', '#4A3170', '#7D0B32']; 
    const [colorIndex, setColorIndex] = useState(0);

    const [isMenuOpen, setMenuOpen] = useState(false); 
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    const menuClasses = `${home.burgerMenu} ${isMenuOpen ? home.open : ''}`; 
    useEffect(() => {
      const timer = setInterval(() => {
        setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
      }, 4500);
      return () => clearInterval(timer);  
    }, [colors.length]); 
 
    const scrollToFooter = () => {
      if (footerRef.current) {
        footerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }; 

    const lineRefs = useRef([]);
    useEffect(() => {
      let observer;
      const currentRefs = lineRefs.current;
      const handleIntersection = (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { y: 45,
                opacity: 0,
              },
              {
                delay: index * 0.1,
                duration: 1.6,
                y: 0,
                opacity: 1,
                ease: "power3.out",
                onComplete: () => {
                  // Setzt die Animation zurück, wenn sie abgeschlossen ist
                  //gsap.set(entry.target, { clearProps: "all" });
                }
              }
            );
          }
        });
      };
    
      if (currentRefs.length > 0) {
        observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
        currentRefs.forEach(ref => observer.observe(ref));
      }
    
      return () => {
        if (observer) {
          currentRefs.forEach(ref => observer.unobserve(ref));
        }
      };
    }, []); 
    const addLineRef = (el) => {
      if (el && !lineRefs.current.includes(el)) {
        lineRefs.current.push(el);
      }
    }; 

    return ( 
      <>
      <Head>
        <title>Was kostet eine Website? » Homepage Kosten berechnen</title>
        <meta name="description" content="Wie viel Kostet es eine Website erstellen zu lassen? Jetzt Ihr Website Preis kostenlos berechnen lassen und Ihre professionelle Website anfragen."/>
        <meta name="keywords" content="Was kostet eine Website, Preise für Website, Wieviel kostet eine Website, Wo Website erstellen lassen, Wie viel kostet eine Homepage, Was kostet eine Homepage, Website Preise, Was kostet ein Webentwickler" />
      </Head>

      <nav className={home.navbar}> 
          <div className={menuClasses} onClick={toggleMenu}></div>
          <ul className={isMenuOpen ? home.menuOpen : ''}>
            <Link href="/" title='Devkid'><Image src="/images/devkid_logo_white.svg" alt="icon" width={120} height={45} className={home.logo} title='Devkid logo'/></Link>
            <li><Link href='/website-erstellen-lassen' title='Website erstellen lassen'>Website erstellen lassen</Link></li>
            <li><Link href='/wordpress-website-erstellen-lassen' title='Wordpress Website erstellen lassen'>WordPress</Link></li>
            <li className='whatsapp'><Link href="https://wa.me/message/U7POMDGUX4DIN1" title="WhatsApp">Chat on WhatsApp</Link></li>
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
              // Füge den Text vor dem speziellen Teil hinzu
              textSegments.push(
                <span key={spanIndex * 2} >
                  {item.text.substring(lastEnd, span.start)}
                </span>
              );

              // Überprüfe den Typ des Span-Elements
              if (span.type === "hyperlink") {
                // Füge den Hyperlink hinzu
                textSegments.push(
                  <a href={span.data.url} key={spanIndex * 2 + 1} >
                    {item.text.substring(span.start, span.end)}
                  </a>
                );
              } else {
                // Füge den "strong" Teil hinzu
                textSegments.push(
                  <strong key={spanIndex * 2 + 1}>
                    {item.text.substring(span.start, span.end)}
                  </strong>
                );
              }

              lastEnd = span.end;
            });
            // Füge den Rest des Textes nach dem letzten speziellen Teil hinzu
            textSegments.push(<span key={textSegments.length}>{item.text.substring(lastEnd)}</span>);
            return <p key={index} ref={addLineRef}>{textSegments}</p>;
          } else if (item.type === "heading3") {
            return <h3 key={index} ref={addLineRef}>{item.text}</h3>;
          } else if (item.type === "heading2") {
            return <h2 key={index} ref={addLineRef}>{item.text}</h2>;
          } else if (item.type === "heading1") {
            return <h1 key={index} ref={addLineRef}>{item.text}</h1>;
          }
          return null;
          })}
          <a href={`mailto:devkid.stgt@gmail.com?subject=DevKid - Erstgespräch Anfrage`} className="cta-button" title='Erstgespräch' ref={addLineRef}>Jetzt Erstgespräch anfragen</a>
        </div>
        {headerImage ? 
          <div className={home.imagebox}>
            <Image src={headerImage.url} alt='website erstellen lassen' width={778} height={673} title='Website erstellen lassen' ref={addLineRef}/> 
          </div> : null 
        }
        <div className={home.overlaybox}></div>   
      </header>

      <main className={home["main-text"]}>
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