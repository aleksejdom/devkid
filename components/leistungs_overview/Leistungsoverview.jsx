import styles from './Leistungsoverview.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Leistungsoverview({ leistungsoverview_items, leistungsoverview_title }) {
  return ( 
    <div className={ styles['leistungs-overview'] }>
      <h2>
        {leistungsoverview_title[0].text}  
      </h2>
      <div className={ styles['items'] }> 
        {leistungsoverview_items.map((item, index) => (
          <div className={ styles['item'] } key={index}> 
            <div className={ styles['item-header'] }>
              <LazyLoadImage 
                src={item.icon.url} 
                alt={item.icon.alt} 
              />
              <h3>{item.content[0].text}</h3>
            </div>
            <p>{item.content[1].text}</p>
          </div>
        ))}
      </div> 
    </div>
  );
}