import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Prismic from 'prismic-javascript'
import Footer from '../components/footer/Footer' 
import Link from 'next/link';


const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

function Impressum({button, footer}) {
    return ( 
      <>
      <Head>
        <title>Impressum | Digitalagentur aus Stuttgart</title>
        <meta name="description" content="Impressumseite von Digitalagentur Stgt"/>
        <meta name="keywords" content="Digitalagentur Stuttgart, Impressum" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Digitalagentur</a>
            </Link>
          </li> 
          <li>
            <Link href={`${button}?subject=Dev-Kid | Digitalagentur Stuttgart - Anfrage`}>
              <a target="">Kontakt</a>
            </Link>
          </li>
          <li className='aktion'>
            Aktion
          </li>
        </ul>
      </nav>

      <main className={styles.mainText} >
        <h1>Impressum</h1>
        <h3>Angaben gemäß § 5 TMG</h3>
        <p>Aleksej Domovec</p> 
        <p>Arnoldstr. 16</p>
        <p>70378 Stuttgart</p>
        <h3>Kontakt</h3>
        <p>Telefon: (+49) 159 063 725 43 </p>
        <p>E-Mail: mail@dev-kid.de</p>
        <h3>Umsatzsteuer-ID</h3>
        <p>Umsatzsteuer-Identifikationsnummer Gemäß §19 Abs. 1 UStG: 93048 / 73367</p> 
        <h3>EU-Streitschlichtung</h3>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: </p>
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer noopener">https://ec.europa.eu/consumers/odr/</a>.
        <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        <h3>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </main>

      <Footer footer={footer}  />
      </>
    )
}


Impressum.getInitialProps = async () => {
  const api = await Prismic.getApi(apiEndpoint)
  const res = await api.query(Prismic.Predicates.at('document.type', 'homepage'))

  const document = res.results[0] 

  
  let buttonLink = '';
  if (document.data.button && document.data.button.url) {
    buttonLink = document.data.button.url;
  }
 
  return { 
    button: buttonLink,
    button_text : document.data.link_text,
    footer : document.data.footer
  }
}

export default Impressum