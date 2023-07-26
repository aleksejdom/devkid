import styles from './Usp_Box.module.css';
import { RichText } from 'prismic-reactjs'

export default function Usp_Box({usp}) {
    return ( 
      <div className={styles.uspBox}>
        <div className={styles.items}> 
          {usp.map((item, index) => (
            <div className={styles.item} key={`usp-item-${index}`}>
              <img src={item.usp_image.url} alt={item.usp_image.alt} />
              <p>{RichText.asText(item.usp_title)}</p>
            </div>
          ))}
        </div>
      </div>
    )
} 