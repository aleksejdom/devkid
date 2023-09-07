import styles from './Contact_Box.module.css'; 
import Image from 'next/image';
import Prismic from 'prismic-javascript'; 
 
const renderRichText = (richTextArray) => {
  return richTextArray.map((item, index) => {
    switch (item.type) {
      case 'heading1':
        return <h1 key={index}>{item.text}</h1>;
      case 'heading3':
        return <h3 key={index}>{item.text}</h3>;
      case 'paragraph':
        return <p key={index}>{item.text}</p>;
      default:
        return null;
    }
  });
};

  

export default function Contact_Box({ contact }) {
  return (
    <div className={styles['contact-box']}>
      <div className={styles.title} >
        {renderRichText(contact.contact_title)}
      </div>
      <Image src={contact.contact_image.url} alt='Aleksej Domovec' title="Webentwickler Stuttgart" width={860} height={804} className={styles.photo} />
      <div className={styles.details}>
        <p className={styles.name}>Aleksej Domovec</p>
        <div>
          {renderRichText(contact.contact_number)}
        </div>
        <div>
          <a href={`mailto:devkid.stgt@gmail.com?subject=DevKid - Anfrage`} target='_self' title="E-Mail Kontakt">
            {renderRichText(contact.contact_email)}
          </a>
        </div>
      </div>
      <Image src='./images/icon.svg' alt="icon" title="devkid icon" width={120} height={68} className={styles.icon} />
    </div>
  );
}

 