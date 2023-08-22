import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head />
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