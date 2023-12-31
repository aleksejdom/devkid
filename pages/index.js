import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss' 
import Prismic from 'prismic-javascript' 
import { gsap } from "gsap";  
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


import Leistungs_Tab from '../components/leistungs_tabs/Leistungs_Tab';
import Contact_Box from '../components/contact_box/Contact_Box';
import Usp_Box from '../components/usp_box/Usp_Box';
import Referenzen_Box from '../components/referenzen_box/Referenzen_Box';
import Footer from '../components/footer/Footer';
import Accordion from '../components/accordion/Accordion';
import Link from 'next/link'; 
import Artikel_Probleme from '../components/artikel_probleme/Artikel_Probleme';
import Text_Box from '../components/text_box/Text_Box'; 
import Responsive_image from '../components/responsive_image/Responsive_image';
import Form_box from '../components/form_box/Form_box';

// Prismic API Endpunkt
const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'
 
function Home({ geschaeftsfelder, header_content, header_image, header_mobile_image, website_konventiert_mobile, website_konvertiert, website_konventiert_screen, agenturen, agenturen_image, website_gestalten, website_gestalten_screen, website_gestalten_mobile, tabs, contact, usp, referenzen, referenzenContent, footer }) {
  const videoRef = useRef(null);
  const headerRef = useRef(null); 
  const colors = ['#05473C', '#4A3170', '#7D0B32']; 
  const [colorIndex, setColorIndex] = useState(0);

  const [isMenuOpen, setMenuOpen] = useState(false); 
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  }; 

  const menuClasses = `${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`; 
  const footerRef = useRef(null);
  const referenzenRef = useRef(null);
  const contactRef = useRef(null); 

  useEffect(() => { 
    gsap.registerPlugin(ScrollTrigger);

    const paths = [...document.querySelectorAll('path.path-anim')];
    
    paths.forEach(el => {
      const svgEl = el.closest('svg');
      const pathTo = el.dataset.pathTo;
  
      gsap.timeline({
        scrollTrigger: {
          trigger: svgEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(el, {
        ease: 'none',
        attr: { d: pathTo },
      });
    });
  }, []);

  let tempLi = []; 
  const renderWithSpans = (text, spans) => {
    if (!spans || spans.length === 0) {
      return text;
    } 
    let lastIndex = 0;
    const elements = []; 
    spans.forEach((span, index) => {
      if (span.type === 'hyperlink') {
        elements.push(text.substring(lastIndex, span.start));
        elements.push(
          <a href={span.data.url} key={index}>
            {text.substring(span.start, span.end)}
          </a>
        );
        lastIndex = span.end;
      }
    }); 
    elements.push(text.substring(lastIndex));
    return elements;
  };    
  const scrollToReferenzen = () => {
    if (referenzenRef.current) {
      referenzenRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.matchMedia('(max-width: 768px)').matches) {
      toggleMenu();
    }
    else{}
    
  } 
  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.matchMedia('(max-width: 768px)').matches) {
      toggleMenu();
    }
    else{}
  } 
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.matchMedia('(max-width: 768px)').matches) {
      toggleMenu();
    }
    else{}
  }; 

  useEffect(() => {
    const currentHeader = headerRef.current; 
    const handleScroll = () => { 
    }; 
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (currentHeader) { 
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
 
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
        <title>Website erstellen | Professionelle Homepage, Design nach Wunsch</title>
        <meta name="description" content="Website erstellen: ✓ schönes und ansprechendem Webdesign ✓ Mobile optimiert ✓ Günstige Preise"/>
        <meta name="keywords" content="Website erstellen, Homepage erstellen, Internetseite erstellen" />
      </Head>

      <nav className={styles.navbar}> 
        <div className={menuClasses} onClick={toggleMenu}></div>
        <ul className={isMenuOpen ? styles.menuOpen : ''}>
          <Link href="/" title='DevKid'><Image src="/images/devkid_logo_white.svg" alt="icon" title="Devkid Logo" width={120} height={45} className={styles.logo} /></Link>
          <li><Link href="/leistungen" title='Leistungen'>Leistungen</Link></li> 
          <li><Link href="#Referenzen" onClick={scrollToReferenzen} title='Referenzen'>Referenzen</Link></li>  
          <li><Link href="/wordpress-website-erstellen-lassen" title='WordPress Website'>WordPress</Link></li>
          <li><Link href="/webdesign" title='Webdesign'>Webdesign</Link></li>
          <li><Link href="#kontakt" onClick={scrollToContact} title='Kontakt'>Kontakt</Link></li>       
          <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter} title="Rabatt Aktion">Sale 15% Rabatt</Link></li>
        </ul>
      </nav>

      <header className={styles.header}>  
        <Text_Box content={header_content}/>   
        <Responsive_image image_screen={header_image.url} image_mobile={header_mobile_image.url} image_alt={header_image.alt}/> 
        <p className={styles.zitat} ref={addLineRef}>
          &quot;Zauberhafte Ideen<br />treffen auf Erfahrung.&quot;
        </p>
      </header>
 
      <main className={styles.main}>
        
        <Leistungs_Tab tabs={tabs} id="leistungs-tab" />
        <Contact_Box contact={contact} />

        { website_konvertiert && 
          <div className="fullwide-image-box">
            <Text_Box content={website_konvertiert}/>  
            <Responsive_image image_screen={website_konventiert_screen.url} image_mobile={website_konventiert_mobile.url} image_alt={website_konventiert_screen.alt}/> 
          </div>
        }

        { agenturen && 
          <div className='text-image-box' style={{ backgroundColor: colors[colorIndex] }}>
            <div className='text-image-box-content'>
              <Text_Box content={agenturen} headline={'normal'} cta={'yes'} cta_text={'Beratung anfragen'}  />  
              <div className="image-box">  
                <Image src={agenturen_image.url} title={agenturen_image.alt} alt={agenturen_image.alt} width={1920} height={1080} ref={addLineRef}/> 
                <Image src='./images/icon.svg' alt="icon" title="devkid icon" width={120} height={68} className='icon' ref={addLineRef}/>
              </div>
            </div> 
          </div>
        }

        { website_gestalten && 
          <div className="fullwide-image-box">
            <Text_Box content={website_gestalten}/>  
            <Responsive_image image_screen={website_gestalten_screen.url} image_mobile={website_gestalten_mobile.url} image_alt={website_gestalten_screen.alt}/> 
          </div>
        } 

        { geschaeftsfelder && 
          <div className="fullwide-image-box" style={{ backgroundColor: colors[colorIndex] }}>
            <div className="textBox">
              {geschaeftsfelder.map((item, index) => {
                const key = `${item.type}-${index}`; 
                if (item.type === 'heading2') {
                  return (
                    <span key={`${key}-span`}>
                      <h2 key={key} ref={addLineRef}>{item.text}</h2>
                    </span>
                  )
                } 
                if (item.type === 'paragraph') {
                  return <p key={key} ref={addLineRef}>{renderWithSpans(item.text, item.spans)}</p>;
                } 
                if (item.type === 'list-item') {
                  tempLi.push(<li key={key}>{item.text}</li>);
                  const nextType = geschaeftsfelder[index + 1]?.type;

                  if (nextType !== 'list-item' || index === geschaeftsfelder.length - 1) {
                    const ul = (
                      <ul key={`${key}-ul`} ref={addLineRef}>
                        {tempLi}
                      </ul>
                    );
                    tempLi = [];
                    return ul;
                  } 
                  return null;
                } 
                return null;
              })}
            </div> 
          </div>
        }
 
        <Form_box ref={contactRef} />
        <Usp_Box usp={usp}/> 
        <Referenzen_Box referenzen={referenzen} referenzenContent={referenzenContent} ref={referenzenRef} />  
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
    button : document.data.button,
    header_content: document.data.header_content,
    header_image: document.data?.header_image, 
    header_mobile_image : document.data?.header_mobile_image,
    tabs : document.data.tabs,
    contact : document.data.contact[0],
    usp : document.data.usp,
    referenzen : document.data.referenzen,
    referenzenContent : document.data.referenz_content,
    footer : document.data.footer,
    accordion : document.data.accordion, 
    one_click_content_image : document?.data.one_click_content_image,
    one_click_content : document?.data.one_click_content,
    artikel_probleme_headline : document?.data.artikel_probleme_headline,
    artikel_probleme : document?.data.artikel_probleme,
    website_konvertiert : document?.data.website_konvertiert,
    website_konventiert_mobile : document?.data.website_konventiert_mobile,
    website_konventiert_screen : document?.data.website_konventiert_screen, 
    agenturen : document?.data.agenturen,
    agenturen_image : document?.data.agenturen_image,
    website_gestalten : document?.data.website_gestalten,
    website_gestalten_screen : document?.data.website_gestalten_screen,
    website_gestalten_mobile : document?.data.website_gestalten_mobile,
    wp_next_content : document?.data.wp_next_content,
    wp_next_content_second : document?.data.wp_next_content_second,
    wp_next_list : document?.data.wp_next_list,
    website_pflege : document?.data.website_pflege,
    website_pflege_image : document?.data.website_pflege_image,
    geschaeftsfelder : document?.data.geschaeftsfelder,
    geschaeftsfelder_image_screen : document?.data.geschaeftsfelder_image_screen,
    geschaeftsfelder_image_mobile : document?.data.geschaeftsfelder_image_mobile,
    long_text : document?.data.long_text, 
    long_text_cta : document?.data.long_text_cta,
  }
}

export default Home;