import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
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
        </Head>
        <body>
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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument