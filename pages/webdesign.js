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
import Form_box from '../components/form_box/Form_box';
import Referenzen_Box from '../components/referenzen_box/Referenzen_Box';

// Prismic API Endpunkt
const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function Webdesign(
{ 
  header_content, 
  header_image, 
  header_image_mobile,  
  footer, 
  konzeption,
  konzeption_image,
  experten,
  experten_image,
  experten_image_mobile,
  designwunsch,
  designwunsch_image,
  branding,
  branding_image,
  wordpress,
  wordpress_image,
  wordpress_image_mobile,
  weitere_leistungen,
  firmenwebsite,
  firmenwebsite_image,
  firmenwebsite_image_mobile,
  referenzen,
  referenzenContent,
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
          <title>Website Design | Webdesign erstellen</title>
          <meta name="description" content="Webdesign erstellen: ✓ modern, klassisch und individuell ✓ Professionelles Webdesign nach Wunsch ✓ Top Preise - Webdesign Agentur"/>
          <meta name="keywords" content="Webdesign, Website Design" />
        </Head>

        <nav className={styles.navbar}> 
          <div className={menuClasses} onClick={toggleMenu}></div>
          <ul className={isMenuOpen ? styles.menuOpen : ''}>
            <Link href="/" title='DevKid'><Image src="/images/devkid_logo_white.svg" alt="icon" title="Devkid Logo" width={120} height={45} className={styles.logo} /></Link>
            <li><Link href="/" title='Startseite'>Startseite</Link></li>  
            <li><Link href="/leistungen" title='Leistungen'>Leistungen</Link></li>  
            <li><Link href="#kontakt" onClick={scrollToContact} title='Kontakt'>Kontakt</Link></li>       
            <li className='whatsapp'><Link href="https://wa.me/message/U7POMDGUX4DIN1" title="WhatsApp">Chat on WhatsApp</Link></li>
            <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter} title="Rabatt Aktion">Sale 15% Rabatt</Link></li>
          </ul>
        </nav>

        <header className={styles.header}>  
          <Text_Box content={header_content} headline={'margin'}/>
          {header_image &&
            <Responsive_image image_screen={header_image.url} image_mobile={header_image_mobile.url} image_alt={header_image.alt}/> 
          }   
        </header>
        
        <main className={styles.main}>   
          { konzeption && 
            <div className='text-image-box' style={{ backgroundColor: colors[colorIndex] }}>
              <div className='text-image-box-content'>
                <div className={`${styles.textBox} ${styles.left}`}> 
                  {konzeption.map((item, index) => {
                    const key = `${item.type}-${index}`; 
                    if (item.type === 'heading2') {
                      return ( 
                        <h2 key={key} ref={addLineRef}>{item.text}</h2> 
                      )
                    } 
                    if (item.type === 'paragraph') {
                      return <p key={key} ref={addLineRef}>{renderWithSpans(item.text, item.spans)}</p>;
                    } 
                    if (item.type === 'list-item') {
                      tempLi.push(<li key={key}>{item.text}</li>);
                      const nextType = konzeption[index + 1]?.type;

                      if (nextType !== 'list-item' || index === konzeption.length - 1) {
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
                <div className="image-box">  
                  <Image src={konzeption_image.url} title={konzeption_image.alt} alt={konzeption_image.alt} width={1920} height={1080} ref={addLineRef}/> 
                  <Image src='./images/icon.svg' alt="icon" title="devkid icon" width={120} height={68} className='icon' ref={addLineRef}/>
                </div>
              </div> 
            </div>
          } 
          { experten && 
            <div className="fullwide-image-box">
              <Text_Box content={experten}/>  
              <Responsive_image image_screen={experten_image.url} image_mobile={experten_image_mobile.url} image_alt={experten_image.alt}/> 
            </div>
          }
          { designwunsch && 
            <div className='text-image-box' style={{ backgroundColor: colors[colorIndex] }}>
              <div className='text-image-box-content'>
                <Text_Box content={designwunsch}  />  
                <div className="image-box">  
                  <Image src={designwunsch_image.url} title={designwunsch_image.alt} alt={designwunsch_image.alt} width={1920} height={1080} ref={addLineRef}/> 
                  <Image src='./images/icon.svg' alt="icon" title="devkid icon" width={120} height={68} className='icon' ref={addLineRef}/>
                </div>
              </div> 
            </div>
          }
          { wordpress && 
            <div className="fullwide-image-box">
              <Text_Box content={wordpress}/>  
              <Responsive_image image_screen={wordpress_image.url} image_mobile={wordpress_image_mobile.url} image_alt={wordpress_image.alt}/> 
            </div>
          }
          { weitere_leistungen &&
            <div className={styles['container']}>
              <div className={styles['content-box']}>
                {weitere_leistungen ? (() => {
                  const elements = [];
                  let listItems = [];

                  weitere_leistungen.forEach((item, index) => {
                    if (item.type === "paragraph") {
                      const textSegments = [];
                      let lastEnd = 0;
                      item.spans.forEach((span, spanIndex) => {
                        textSegments.push(
                          <span key={spanIndex * 2}>
                            {item.text.substring(lastEnd, span.start)}
                          </span>
                        );
                        textSegments.push(
                          <strong key={spanIndex * 2 + 1} ref={addLineRef}>
                            {item.text.substring(span.start, span.end)}
                          </strong>
                        );
                        lastEnd = span.end;
                      });
                      textSegments.push(<span key={textSegments.length}>{item.text.substring(lastEnd)}</span>);
                      elements.push(<p key={index}>{textSegments}</p>);
                    } else if (item.type === "heading3") {
                      elements.push(<h3 key={index}>{item.text}</h3>);
                    } else if (item.type === "heading2") {
                      elements.push(<h2 key={index} ref={addLineRef}>{item.text}</h2>);
                    } else if (item.type === "heading1") {
                      elements.push(<h1 key={index}>{item.text}</h1>);
                    } else if (item.type === "list-item") {
                      listItems.push(<li key={index} ref={addLineRef}>{item.text}</li>);
                    } 
                    if ((item.type !== "list-item" && listItems.length > 0) || (index === weitere_leistungen.length - 1)) {
                      elements.push(<ul key={`ul-${index}`}>{listItems}</ul>);
                      listItems = [];
                    }
                  }); 
                  return elements;
                })() : null}
              </div>
            </div>
          }
          { firmenwebsite && 
            <div className="fullwide-image-box">
              <Text_Box content={firmenwebsite} headline={'margin'}/>  
              <Responsive_image image_screen={firmenwebsite_image.url} image_mobile={firmenwebsite_image_mobile.url} image_alt={firmenwebsite_image.alt}/> 
            </div>
          }
          { branding && 
            <div className='text-image-box' style={{ backgroundColor: colors[colorIndex] }}>
              <div className='text-image-box-content'>
                <Text_Box content={branding}  />  
                <div className="image-box">  
                  <Image src={branding_image.url} title={branding_image.alt} alt={branding_image.alt} width={1920} height={1080} ref={addLineRef}/> 
                  <Image src='./images/icon.svg' alt="icon" title="devkid icon" width={120} height={68} className='icon' ref={addLineRef}/>
                </div>
              </div> 
            </div>
          }
          <Referenzen_Box referenzen={referenzen} referenzenContent={referenzenContent} link={'yes'}/>  
          <Form_box ref={contactRef} />  
        </main>

        <Footer footer={footer} id="footer" ref={footerRef} />
      </>
    )
  }

  Webdesign.getInitialProps = async () => {
    const api = await Prismic.getApi(apiEndpoint)
    const customRes = await api.query(Prismic.Predicates.at('document.type', 'homepage'))
    const customDoc = customRes.results[0] 
    const res = await api.query(Prismic.Predicates.at('document.type', 'webdesign'))
    const document = res.results[0]
  
    return { 
      header_content: document?.data.header_content,
      header_image: document?.data.header_image,
      header_image_mobile: document?.data.header_image_mobile,  
      footer : customDoc?.data.footer,
      referenzen : customDoc?.data.referenzen,
      referenzenContent : document?.data.referenz_content,
      konzeption : document?.data.konzeption,
      konzeption_image : document?.data.konzeption_image,
      experten : document?.data.experten,
      experten_image : document?.data.experten_image,
      experten_image_mobile : document?.data.experten_image_mobile,
      designwunsch : document?.data.designwunsch,
      designwunsch_image : document?.data.designwunsch_image,
      wordpress : document?.data.wordpress,
      wordpress_image : document?.data.wordpress_image,
      wordpress_image_mobile : document?.data.wordpress_image_mobile,
      weitere_leistungen : document?.data.weitere_leistungen,
      firmenwebsite : document?.data.firmenwebsite,
      firmenwebsite_image : document?.data.firmenwebsite_image,
      firmenwebsite_image_mobile : document?.data.firmenwebsite_image_mobile,
      branding : document?.data.branding,
      branding_image : document?.data.branding_image,
    }
  }

export default Webdesign;