import styles from './Contact_Box.module.css';
import { RichText } from 'prismic-reactjs'

const apiEndpoint = 'https://aleksej.cdn.prismic.io/api/v2'

export default function Contact_Box( {contact, button} ) {
    return ( 
      <div className={ styles['contact-box'] }>
        <p className={ styles.title }>{ RichText.asText(contact.contact_title) }</p>
        <img src={ contact.contact_image.url } alt={contact.contact_image.alt} width={297} height={360} className={styles.photo} />
        <div className={ styles.details }>
          <p className={styles.name}>Aleksej Domovec</p>
          <p>{ RichText.asText(contact.contact_number) }</p>
          <a href={`${button}?subject=Dev-Kid - Anfrage`} target='_self'><p>{ RichText.asText(contact.contact_email) }</p></a>
        </div>
        <img src='./images/icon.svg' alt="icon" width={120} height={68} className={styles.icon} />
      </div>
    )
}

Contact_Box.getInitialProps = async () => {
  const api = await Prismic.getApi(apiEndpoint)
  const res = await api.query(Prismic.Predicates.at('document.type', 'homepage'))

  const document = res.results[0] 

  
  let buttonLink = '';
  if (document.data.button && document.data.button.url) {
    buttonLink = document.data.button.url;
  }
 
  return { 
    button: buttonLink,
  }
}