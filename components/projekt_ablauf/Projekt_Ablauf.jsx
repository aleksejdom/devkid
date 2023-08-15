import styles from './Projekt_Ablauf.module.css';

export default function Projekt_Ablauf({ projekt_ablauf_items, button }) {
  return ( 
    <div className={ styles['projekt-ablauf'] }>
      <h2>
        In nur 6 Schritten können Sie Ihre eigene Website erstellen lassen und schnell online präsent sein.  
      </h2>
      <div className={ styles['items'] }> 
        {projekt_ablauf_items.map((item, index) => (
          <div className={ styles['item'] } key={item.title[0].text}>
            <h3 className={ styles['title'] }>
              <span>{index+1}.</span>
              {item.title[0].text}
            </h3>
            <p className={ styles['description'] }>
              {item.description[0].text}
            </p>
          </div>
        ))}
      </div>
      {button ? <a href={`${button}?subject=DevKid - Website erstellen lassen`} className={ styles['cta-button'] } title="Anfrage">Jetzt Ihre eigene Website erstellen lassen</a> : null} 
    </div>
  );
}