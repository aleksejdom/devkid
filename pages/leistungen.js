import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss' 
import Prismic from 'prismic-javascript' 
import { gsap } from "gsap";  
import Footer from '../components/footer/Footer'; 
import Link from 'next/link';  
import Text_Box from '../components/text_box/Text_Box'; 
import Responsive_image from '../components/responsive_image/Responsive_image'; 
import Leistungs_Tab from '../components/leistungs_tabs/Leistungs_Tab';
import Contact_Box from '../components/contact_box/Contact_Box';
import Form_box from '../components/form_box/Form_box';

// Prismic API Endpunkt
const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function Leistungen(
{ 
  header_content, 
  header_image, 
  header_image_mobile,
  tabs,
  contact,  
  footer,
  digitalagentur_content,
  digitalagentur_content_image, 
  geschaeftsfelder,
  geschaeftsfelder_image_screen,
  geschaeftsfelder_image_mobile

}) { 
    const headerRef = useRef(null); 
    const colors = ['#05473C', '#4A3170', '#7D0B32']; 
    const [colorIndex, setColorIndex] = useState(0);

    const [isMenuOpen, setMenuOpen] = useState(false); 
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    }; 

    const menuClasses = `${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`; 
    const footerRef = useRef(null); 
    const contactRef = useRef(null);

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
    const scrollToContact = () => {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
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
          <title>Agenturleistungen im Überblick</title>
          <meta name="description" content="Professionelle Leistungen im Bereich: ✓ Webdesign ✓ Website Erstellung ✓ Corporate Design und Gestaltung von Medien"/>
          <meta name="keywords" content="Agenturleistungen, Leistungen, Service" />
        </Head>

        <nav className={styles.navbar}> 
          <div className={menuClasses} onClick={toggleMenu}></div>
          <ul className={isMenuOpen ? styles.menuOpen : ''}>
            <Link href="/" title='DevKid'><Image src="/images/devkid_logo_white.svg" alt="icon" title="Devkid Logo" width={120} height={45} className={styles.logo} /></Link>
            <li><Link href="/" title='Startseite'>Startseite</Link></li>
            <li><Link href="/webdesign" title='Webdesign'>Webdesign</Link></li>  
            <li><Link href="#kontakt" onClick={scrollToContact} title='Kontakt'>Kontakt</Link></li>       
            <li className='whatsapp'><Link href="https://wa.me/message/U7POMDGUX4DIN1" title="WhatsApp">Chat on WhatsApp</Link></li>
            <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter} title="Rabatt Aktion">Sale 15% Rabatt</Link></li>
          </ul>
        </nav>

        <header className={styles.header}>  
          <Text_Box content={header_content}/>
          {header_image &&
            <Responsive_image image_screen={header_image.url} image_mobile={header_image_mobile.url} image_alt={header_image.alt}/> 
          }   
        </header>
        
        <main className={styles.main}> 
          {tabs &&
            <Leistungs_Tab tabs={tabs} id="leistungs-tab" />
          }  
          {contact &&
            <Contact_Box contact={contact} /> 
          }
          { digitalagentur_content && 
            <div className='text-image-box' style={{ backgroundColor: colors[colorIndex] }}>
              <div className='text-image-box-content'>
                <Text_Box content={digitalagentur_content} headline={'normal'} />  
                <div className="image-box">  
                  <Image src={digitalagentur_content_image.url} title={digitalagentur_content_image.alt} alt={digitalagentur_content_image.alt} width={1920} height={1080} ref={addLineRef}/> 
                  <Image src='./images/icon.svg' alt="icon" title="devkid icon" width={120} height={68} className='icon' ref={addLineRef}/>
                </div>
              </div> 
            </div>
          }
          { geschaeftsfelder && 
            <div className="fullwide-image-box">
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
              <Responsive_image image_screen={geschaeftsfelder_image_screen.url} image_mobile={geschaeftsfelder_image_mobile.url} image_alt={geschaeftsfelder_image_screen.alt}/> 
            </div>
          }
          <Form_box ref={contactRef} />  
        </main>

        <Footer footer={footer} id="footer" ref={footerRef} />
      </>
    )
  }

  Leistungen.getInitialProps = async () => {
    const api = await Prismic.getApi(apiEndpoint)
    const customRes = await api.query(Prismic.Predicates.at('document.type', 'homepage'))
    const res = await api.query(Prismic.Predicates.at('document.type', 'leistungen'))
    const document = res.results[0]
    const customDoc = customRes.results[0] 
  
    return { 
      header_content: document?.data.header_content,
      header_image: document?.data.header_image,
      header_image_mobile: document?.data.header_image_mobile,
      tabs : customDoc?.data.tabs,
      contact : customDoc?.data.contact[0],
      footer : customDoc?.data.footer,
      digitalagentur_content : document?.data.digitalagentur_content,
      digitalagentur_content_image : document?.data.digitalagentur_content_image,
      geschaeftsfelder : document?.data.geschaeftsfelder,
      geschaeftsfelder_image_screen : document?.data.geschaeftsfelder_image_screen,
      geschaeftsfelder_image_mobile : document?.data.geschaeftsfelder_image_mobile, 
    }
  }

export default Leistungen;