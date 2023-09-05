import styles from './Usp_Box.module.scss';
import { RichText } from 'prismic-reactjs'
import Image from 'next/image';


export default function Usp_Box({usp}) {
  return ( 
    <div className={styles.uspBox}>
      <h3>Das können unsere Kunden von uns erwarten.</h3>
      <div className={styles.items}> 
        {usp.map((item, index) => (
          <div className={styles.item} key={`usp-item-${index}`}>
            <Image src={item.usp_image.url} alt='USP' title='USP DEVKID' layout='fill' objectFit='cover' />
            <p>{RichText.asText(item.usp_title)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}