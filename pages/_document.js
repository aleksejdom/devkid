import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    
    const serviceSchema = {
      "@context": "http://schema.org",
      "@type": "Service",
      "name": "Devkid - Website für Unternehmen erstellen lassen",
      "serviceType": "Website Erstellung und Webdesign",
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
    };

    const personSchema = {
      "@context": "http://schema.org",
      "@type": "Person",
      "name": "Aleksej Domovec",
      "jobTitle": "Webentwickler und Grafikdesigner",
      "url": "https://www.dev-kid.de",
      "sameAs": [
        "https://www.linkedin.com/in/aleksej-domovec-355462177/",
        "https://dev-kid.de"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Stuttgart",
        "addressRegion": "Baden Württemberg",
        "postalCode": "70378",
        "addressCountry": "Deutschland"
      }
    };

    const linksSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://dev-kid.de/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://dev-kid.de/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "xpath": [
          "/html/head/title",
          "/html/head/meta[@name='description']/@content"
        ]
      },
      "mainEntity": [{
        "@type": "WebPage",
        "name": "Website erstellen - Professionelle Homepage, Design nach Wunsch",
        "url": "https://dev-kid.de"
      },{
        "@type": "WebPage",
        "name": "Leistungen",
        "url": "https://dev-kid.de/leistungen"
      },{
        "@type": "WebPage",
        "name": "Webdesign erstellen",
        "url": "https://dev-kid.de/webdesign"
      },{
        "@type": "WebPage",
        "name": "Eigene WordPress Website",
        "url": "https://dev-kid.de/wordpress-website-erstellen-lassen"
      },{
        "@type": "WebPage",
        "name": "Was kostet eine Website",
        "url": "https://dev-kid.de/website-erstellen-lassen/was-kostet-eine-website"
      }]
    }


    return (
      <Html lang="de">
        <Head>
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

          <meta name="author" content="Aleksej Domovec" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <meta property="og:title" content="Website erstellen | Professionelle Homepage, Design nach Wunsch" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://dev-kid.de" />
          <meta property="og:image" content="https://dev-kid.de/images/og_header.jpg" />
          <meta property="og:description" content="Website erstellen: ✓ schönes und ansprechendem Webdesign ✓ Mobile optimiert ✓ Günstige Preise" />
          <meta property="og:site_name" content="DevKid - Website Erstellung und Design aus Stuttgart" />
          <meta property="og:locale" content="de_DE" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          ></script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(linksSchema) }}
          ></script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          ></script> 
        </Head>
        <body>
          <Script id="cookieyes" src="https://cdn-cookieyes.com/client_data/f38bad507948038fa664f720/script.js" strategy="beforeInteractive" />
          <Script id="tagmanager" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-9ZH0J8C7FN" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9ZH0J8C7FN');
            `}
            </Script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument