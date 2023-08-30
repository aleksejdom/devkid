import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image' 
import home from '../styles/Home.module.css';  
import styles_wordpress_website_erstellen_lassen from '../styles/WordpressWebsiteErstellenLassen.module.scss'
import Prismic from 'prismic-javascript'
import Footer from '../components/footer/Footer' 
import Link from 'next/link'; 
import Script from 'next/script'
import Text_Box from '../components/text_box/Text_Box';
import Gradient_Box from '../components/gradient_box/Gradient_Box';
import Accordion from '../components/accordion/Accordion';

const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function WordpressWebsiteErstellenLassen({footer, header_content, header_gradient_box, intro_content, baukasten_content, weitere_leistungen, raus_90er_content, raus_90er_image, unternehmens_blog, unternehmens_blog_items, nextjs_content, more_time_content, more_time_content_image, accordion }) {  
    const footerRef = useRef(null); 
    const videoRef = useRef(null);
    const headerRef = useRef(null);
    const komponenteRef = useRef(null) 
    const blogRef = useRef(null) 
    const upToDateRef = useRef(null) 
    const nextJsRef = useRef(null)
    const factsRef = useRef(null)
    const faqRef = useRef(null)
    const colors = ['#05473C', '#4A3170', '#7D0B32']; 
    const [colorIndex, setColorIndex] = useState(0); 

    const [isMenuOpen, setMenuOpen] = useState(false); 
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    const menuClasses = `${home.burgerMenu} ${isMenuOpen ? home.open : ''}`;

    const blockBaukastenRef = useRef(null);
 
    useEffect(() => {
      const timer = setInterval(() => {
        setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
      }, 4500);
      return () => clearInterval(timer);  
    }, [colors.length]);  

    const scrollToBlockBaukasten = () => {
      if (blockBaukastenRef.current) {
        blockBaukastenRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    }; 
    const scrollToKomponente = () => {
      if (komponenteRef.current) {
        komponenteRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };
    const scrollToBlog = () => {
      if (blogRef.current) {
        blogRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };
    const scrollTo90 = () => {
      if (upToDateRef.current) {
        upToDateRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };
    const scrollToNextJs = () => {
      if (nextJsRef.current) {
        nextJsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };
    const scrollToFacts = () => {
      if (factsRef.current) {
        factsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };
    const scrollToFaq = () => {
      if (footerRef.current) {
        footerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    };
    
    //Video
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (videoRef.current) {
              if (entry.isIntersecting) {
                videoRef.current.play().catch(error => {
                  if (error.name !== "AbortError") {  // Fehler, die durch das Pausieren des Videos während des Abspielversuchs entstehen, ignorieren
                    console.error('Video play failed:', error);
                  }
                });
              } else {
                if (!videoRef.current.paused) {
                  videoRef.current.pause();
                }
              }
            }
          });
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
    
    const scrollToFooter = () => {
      if (footerRef.current) {
        footerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }; 
  

    return ( 
      <>  
        <Head>
          <title>WordPress Website erstellen lassen » Kosten inkl. Design</title>
          <meta name="description" content="Für Unternehmer oder Privatpersonen – prof. WordPress Websites zu top Preisen! WordPress Website erstellen lassen, die begeistert - Jetzt erstellen lassen!"/>
          <meta name="keywords" content="Wordpress Website erstellen lassen, WordPress Websites, Wordpress, Wordpress Homepage bauen lassen, WordPress Homepage, Wordpress Blocks, Websites" />
        </Head>

        <nav className={home.navbar}> 
          <div className={menuClasses} onClick={toggleMenu}></div>
          <ul className={isMenuOpen ? home.menuOpen : ''}>
            <Link href="/" title='DevKid'><Image src="/images/devkid_logo_white.svg" alt="icon" title="Devkid Logo" width={120} height={45} className={home.logo} /></Link>
            <li><Link href="#BlockBaukasten" title='Block Baukasten' onClick={scrollToBlockBaukasten}>Block-Baukasten</Link></li> 
            <li><Link href="#Komponente" title='Block Komponente' onClick={scrollToKomponente}>Komponente</Link></li> 
            <li><Link href="#UpToDate" title='Blog' onClick={scrollTo90}>Up-to-Date</Link></li>
            <li><Link href="#Blog" title='Blog' onClick={scrollToBlog}>Blog</Link></li>
            <li><Link href="#Nextjs" title='Nextjs' onClick={scrollToNextJs}>Nextjs</Link></li>
            <li><Link href="#Facts" title='Facts' onClick={scrollToFacts}>Facts</Link></li>
            <li><Link href="#FAQ" title='FAQ' onClick={scrollToFaq}>FAQ</Link></li>
            <li className='whatsapp'><Link href="https://wa.me/message/U7POMDGUX4DIN1" title="WhatsApp">Chat on WhatsApp</Link></li>
            <li className='aktion'><Link href="#rabatt" onClick={scrollToFooter} title="Rabatt Aktion">Sale 15% Rabatt</Link></li>
             
          </ul>
        </nav>

        <header className={home.header} style={{ backgroundColor: colors[colorIndex] }} > 
          <div className={styles_wordpress_website_erstellen_lassen.headlinebox}>
            <Text_Box content={header_content} /> 
            <Gradient_Box content={header_gradient_box}/> 
          </div> 
          <div className={home.overlaybox}></div>
        </header>

        <main className={styles_wordpress_website_erstellen_lassen["main-text"]} ref={blockBaukastenRef}> 
           <div className={styles_wordpress_website_erstellen_lassen['textBox']} >
              <Text_Box content={intro_content} align={'center'} headline={'big'} />
              <div className={`${home.videobox} ${styles_wordpress_website_erstellen_lassen['center']}`} >
                <video ref={videoRef} autoPlay muted loop playsInline>
                  <source src="./videos/block_video.m4v" type="video/mp4" />
                  <source src="./videos/block_video.webm" type="video/webm" />
                </video>
                <Image src="./images/icon.svg" alt="icon" title="devkid icon" width={120} height={68} className={home.icon} />
              </div> 
           </div>
           <div className='container' style={{ backgroundColor: colors[colorIndex] }} ref={komponenteRef}>
              <div className={['content-box']}>
                <Text_Box content={baukasten_content} headline={'normal'} cta={'yes'} cta_text={'Jetzt Website erstellen lassen'} /> 
                <div className={styles_wordpress_website_erstellen_lassen['block-componente']}>
                  <h3>WordPress Block Komponente</h3>
                  <p>Wir entwickeln auf Ihre Bedürfnisse abgestimmte Komponente</p>
                  <ul className={styles_wordpress_website_erstellen_lassen['items']} >
                    <li>
                      Text
                    </li>
                    <li>
                      Image
                    </li>
                    <li>
                      Carousell
                    </li>
                    <li>
                      Gallery
                    </li>
                    <li>
                      Tabs
                    </li>
                    <li>
                      Accordion
                    </li>
                    <li>
                      Slider
                    </li>
                    <li>
                      CTA
                    </li>
                    <li>
                      Hero Block
                    </li>
                  </ul>
                  <Image src="./images/icon.svg" alt="icon" title="devkid icon" width={120} height={68} className={styles_wordpress_website_erstellen_lassen.icon} />
                </div>
              </div>
              <div className="overlaybox"></div>
           </div>
           <div className={styles_wordpress_website_erstellen_lassen['container']}>
              <div className={styles_wordpress_website_erstellen_lassen['content-box']}>
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
                          <strong key={spanIndex * 2 + 1}>
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
                      elements.push(<h2 key={index}>{item.text}</h2>);
                    } else if (item.type === "heading1") {
                      elements.push(<h1 key={index}>{item.text}</h1>);
                    } else if (item.type === "list-item") {
                      listItems.push(<li key={index}>{item.text}</li>);
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
           <div className='container' style={{ backgroundColor: colors[colorIndex] }} ref={upToDateRef}>
              <div className={['content-box']}>
                <Text_Box content={raus_90er_content} headline={'normal'} read_more={'yes'}/> 
                <div className={styles_wordpress_website_erstellen_lassen['image-box']} >
                  <div className={styles_wordpress_website_erstellen_lassen['image-box-wrapper']} >
                    <Image src={raus_90er_image.url} title={raus_90er_image.alt} alt={raus_90er_image.alt} width={715} height={402} />
                  </div>
                  <Image src="./images/icon.svg" alt="icon" title="devkid icon" width={120} height={68} className={styles_wordpress_website_erstellen_lassen.icon} />
                </div>
              </div>
              <div className="overlaybox"></div>
           </div>
           <div className={styles_wordpress_website_erstellen_lassen["large-text"]} ref={blogRef}>
            <div className={styles_wordpress_website_erstellen_lassen["content-box"]} > 
              {unternehmens_blog ? (() => {
                const elements = [];
                let listItems = [];

                unternehmens_blog.forEach((item, index) => {
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
                        <strong key={spanIndex * 2 + 1}>
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
                    elements.push(<h2 key={index}>{item.text}</h2>);
                  } else if (item.type === "heading1") {
                    elements.push(<h1 key={index}>{item.text}</h1>);
                  } else if (item.type === "list-item") {
                    listItems.push(<li key={index}>{item.text}</li>);
                  } 
                  if ((item.type !== "list-item" && listItems.length > 0) || 
                  (index === unternehmens_blog.length - 1 && listItems.length > 0)) {
                      elements.push(<ul key={`ul-${index}`}>{listItems}</ul>);
                      listItems = []; // Liste zurücksetzen
                    }
                  });
              
                  return elements;
                })() : null
              } 
            </div>
            <ul className={styles_wordpress_website_erstellen_lassen["large-text-list"]}>
              {
                unternehmens_blog_items.map((item, index) => (
                  <li key={index}>{item.text}</li>
                ))
              }
            </ul>   
           </div>
           <div className='container' style={{ backgroundColor: colors[colorIndex] }} ref={nextJsRef}>
              <div className={['content-box']}>
                <Text_Box content={nextjs_content} headline={'normal'} read_more={'yes'}/> 
                <div className={styles_wordpress_website_erstellen_lassen['block-componente']}>
                  <h3>Was kostet das Erstellen einer WordPress Website?</h3>
                  <p>Die Websitekosten variieren je nach Anspruch und Design. Hier können Sie Ihre Kosten genau berechnen:</p>  
                  <Link 
                    href="/website-erstellen-lassen/was-kostet-eine-website" 
                    className={styles_wordpress_website_erstellen_lassen['cta-button']} 
                    title='Website'>
                    Mehr erfahren
                  </Link>
                  <Image src="./images/icon.svg" alt="icon" title="devkid icon" width={120} height={68} className={styles_wordpress_website_erstellen_lassen.icon} />
                </div> 
              </div>
              <div className="overlaybox"></div>
           </div>
           <div className='text-image-box'>
              <div className='text-image-box-content'>
                <Text_Box content={more_time_content} headline={'normal'} />
                <div className="image-box">
                  <Image src={more_time_content_image.url} title={more_time_content_image.alt} alt={more_time_content_image.alt} width={1920} height={1080} />
                </div>  
              </div>
              <div className='overlaybox'></div>
           </div>
           <div className='container' style={{ backgroundColor: colors[colorIndex] }} ref={factsRef}>
              <div className={['content-box']}>
                <div className={styles_wordpress_website_erstellen_lassen['text-box']} >
                  <h2>Noch nicht überzeugt?</h2>
                  <p>Entdecken Sie die Vorteile, die Millionen von Nutzer begeistern!</p>
                  <div className={styles_wordpress_website_erstellen_lassen['numbers']} >
                    <div className="number">
                      <span>63,1%</span>
                      <p>Marktanteil Weltweit</p>
                    </div>
                    <div className="number">
                      <span>{`>69,5 Mio.`}</span>
                      <p>WordPress Blogs</p>
                    </div>
                    <div className="number">
                      <span>{`>100`}</span>
                      <p>In über 100 Sprachen verfügbar</p>
                    </div>
                  </div>
                  <a href='mailto:devkid.stgt@gmail.com' className={styles_wordpress_website_erstellen_lassen['cta-button']} title='Website'>Jetzt Kontaktieren</a> 
                </div>
                <div className={`${styles_wordpress_website_erstellen_lassen['block-componente']} ${styles_wordpress_website_erstellen_lassen['block-numbers']}`}>
                  <h3>Die größten Unternehmen setzen auf WordPress</h3>
                  <p className={styles_wordpress_website_erstellen_lassen['list']}>
                    <span>Sony Music</span>
                    <span>Facebook Newsroom</span>
                    <span>The Walt Disney Company</span>
                    <span>Mercedes-Benz</span>
                    <span>Quartz</span>
                    <span>Beyonce</span>
                    <span>The New York Times Company</span>
                    <span>...</span>
                  </p>
                </div> 
              </div>
              <div className="overlaybox"></div>
           </div>
           <Accordion accordion={accordion} /> 
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
    header_content : documentWordpressWebsite?.data.header_content,
    header_gradient_box : documentWordpressWebsite?.data.header_gradient_box,
    intro_content : documentWordpressWebsite?.data.intro_content,
    baukasten_content : documentWordpressWebsite?.data.baukasten_content,
    weitere_leistungen : documentWordpressWebsite?.data.weitere_leistungen,
    raus_90er_content : documentWordpressWebsite?.data.raus_90er_content,
    raus_90er_image : documentWordpressWebsite?.data.raus_90er_image,
    unternehmens_blog : documentWordpressWebsite?.data.unternehmens_blog,
    unternehmens_blog_items : documentWordpressWebsite?.data.unternehmens_blog_items,
    nextjs_content : documentWordpressWebsite?.data.nextjs_content,
    more_time_content : documentWordpressWebsite?.data.more_time_content,
    more_time_content_image : documentWordpressWebsite?.data.more_time_content_image,
    accordion : documentWordpressWebsite?.data.accordion,
  }
}

export default WordpressWebsiteErstellenLassen;