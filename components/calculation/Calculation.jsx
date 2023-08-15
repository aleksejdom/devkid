import { useState } from 'react';
import styles from './Calculation.module.css'; 
import Image from 'next/image';

export default function Calculation({ calculation_content, button }) {

  const [summe, setSumme] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [specialCondition, setSpecialCondition] = useState(false); // Hinzufügen eines speziellen Zustands
  const [valuesFromQuestions, setValuesFromQuestions] = useState([0, 0, 0]); // Neue Variable

  const handleAnswerClick = (value, condition = false) => {
    if (condition) {
      setSpecialCondition(true);
    }
    const newValues = [...valuesFromQuestions];
    newValues[questionIndex] = value;
    setValuesFromQuestions(newValues);
  
    // Prüfen, ob es sich um Frage 6 handelt, und ob die Antwort "Ja" ist
    if (questionIndex === 5 && value === 1) {
      setSumme(summe + value + 6); // 450 zur Summe hinzufügen, wenn die Bedingung zutrifft
    } else {
      setSumme(summe + value);
    }
    
    setQuestionIndex(questionIndex + 1);
  };

  const handleBackClick = () => {
    const valueFromQuestion = valuesFromQuestions[questionIndex - 1];
    setSumme(summe - valueFromQuestion);
    setQuestionIndex(questionIndex - 1);
  };

  const resetCalculation = () => {
    setSumme(0);
    setQuestionIndex(0);
    setSpecialCondition(false); // Setzen Sie auch den speziellen Zustand zurück, falls nötig
  };

  return ( 
    <div className={ styles['calculation-box'] }> 
      <div className={ styles['calculator-content'] }> 
         {
          calculation_content.map((item, index) => {
            if (item.type === "paragraph") {
              const textSegments = [];
              let lastEnd = 0;
              // Schleife durch die "spans" und teilt den Text entsprechend auf
              item.spans.forEach((span, spanIndex) => {
                // Füge den Text vor dem "strong" Teil hinzu
                textSegments.push(
                  <span key={spanIndex * 2}>
                    {item.text.substring(lastEnd, span.start)}
                  </span>
                );
                // Füge den "strong" Teil hinzu
                textSegments.push(
                  <strong key={spanIndex * 2 + 1}>
                    {item.text.substring(span.start, span.end)}
                  </strong>
                );
                lastEnd = span.end;
              });
              // Füge den Rest des Textes nach dem letzten "strong" Teil hinzu
              textSegments.push(<span key={textSegments.length}>{item.text.substring(lastEnd)}</span>); 
              return <p key={index}>{textSegments}</p>;
              } else if (item.type === "heading3") {
                return <h3 key={index}>{item.text}</h3>;
              } else if (item.type === "heading2") {
                return <h2 key={index}>{item.text}</h2>;
              } else if (item.type === "heading1") {
                return <h1 key={index}>{item.text}</h1>;
              }
              return null;
            })
         }
      </div>

      <div className={ styles['calculator'] }>
         
        <div className={styles['question']} style={{ display: questionIndex === 0 ? 'block' : 'none' }}>
          <h2><span>Frage 1/6:</span> Welche Technologie soll bei der Programmierung verwendet werden?</h2>
          <div className={styles['answers']}>
            <div className={styles['answer-box']} onClick={() => handleAnswerClick(2)} key="answer-1">
              <Image src='/images/questions/nextjs.png' alt='Nextjs' title="Nextjs Technologie" width={250} height={250}/> 
              <p>
                Nextjs (React)<br />Website
              </p>
            </div>
            <div className={styles['answer-box']} onClick={() => handleAnswerClick(0)} key="answer-2">
              <Image src='/images/questions/wordpress.png' alt='WordPress' title="Wordpress Website" width={250} height={250}/> 
              <p>
                WordPress Website<br /> (Eigenes Theme)
              </p>
            </div>
          </div>
        </div>

        <div className={styles['question']} style={{ display: questionIndex === 1 ? 'block' : 'none' }}>
            <h2><span>Frage 2/6:</span> Um welches Anliegen handelt es sich?</h2>
            <div className={ styles['answers'] }>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(5)} key='answer-1'>
                <Image src='/images/questions/new_site.svg' alt='New Site' title="Website erstellen lassen" width={250} height={250}/> 
                <p>
                  Neue Website + Webdesign
                </p>
              </div>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(5)} key='answer-2'>
                <Image src='/images/questions/relaunch_site.svg' alt='Relaunch Website' title="Relaunch Website erstellen" width={250} height={250}/> 
                <p>
                  Relaunch + Webdesign
                </p>
              </div>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(0, true)} key='answer-3'>
                <Image src='/images/questions/site_plus.svg' alt='Weitere Seite' title='Website Erweiterung' width={250} height={250}/>  
                <p>
                  Weitere Unterseiten (Design Adaption)
                </p>
              </div>      
            </div>
            <div className={ styles['info'] }>
              <button onClick={handleBackClick}>Zurück</button>
            </div>
         </div>

         <div className={styles['question']} style={{ display: questionIndex === 2 ? 'block' : 'none' }}> 
            <h2><span>Frage 3/6:</span> Wieviel ist der Seitenumfang?</h2>
            <div className={ styles['answers'] }>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(8)} key='answer-1'>
                <Image src='/images/questions/five.svg' alt='Question 5' title="5" width={250} height={250}/> 
                <p>
                  Bis 5 Seiten
                </p>
              </div>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(10)} key='answer-2'>
                <Image src='/images/questions/ten.svg' alt='Question 10' title='10' width={250} height={250}/> 
                <p>
                  Bis 10 Seiten
                </p>
              </div>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(13)} key='answer-3'>
                <Image src='/images/questions/fifteen.svg' alt='Question 15' title='Question 15' width={250} height={250}/> 
                <p>
                  Bis 15 Seiten
                </p>
              </div>      
            </div>
            <div className={ styles['info'] }>
              <button onClick={handleBackClick}>Zurück</button>
            </div>
         </div>

         <div className={styles['question']} style={{ display: questionIndex === 3 ? 'block' : 'none' }}> 
            <h2><span>Frage 4/6:</span> Wer erstellt die Texte für die Website?</h2>
            <div className={ styles['answers'] }>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(1)} key='answer-1'>
                <Image src='/images/questions/devkid.svg' alt='Devkid' title='DevKid Stuttgart' width={250} height={250}/> 
                <p>
                  Unser Team
                </p>
              </div>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(0)} key='answer-2'>
                <Image src='/images/questions/user.svg' alt='User' title='User' width={250} height={250}/> 
                <p>
                  Ich übernehme das selbst
                </p>
              </div>      
            </div>
            <div className={ styles['info'] }>
              <button onClick={handleBackClick}>Zurück</button>
            </div>
         </div>

         <div className={styles['question']} style={{ display: questionIndex === 4 ? 'block' : 'none' }}> 
            <h2><span>Frage 5/6:</span> Wer erstellt die Bilder für die Website?</h2>
            <div className={ styles['answers'] }>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(1)} key='answer-1'>
                <Image src='/images/questions/devkid.svg' alt='Devkid' title='DevKid' width={250} height={250}/> 
                <p>
                  Unser Team
                </p>
              </div>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(0)} key='answer-2'>
                <Image src='/images/questions/user.svg' alt='User' title="User" width={250} height={250}/> 
                <p>
                  Ich übernehme das selbst
                </p>
              </div>      
            </div>
            <div className={ styles['info'] }>
              <button onClick={handleBackClick}>Zurück</button>
            </div>
         </div>

         <div className={styles['question']} style={{ display: questionIndex === 5 ? 'block' : 'none' }}> 
            <h2><span>Frage 6/6:</span> Ist die Suchmaschinenoptimierung (SEO) erwünscht?</h2>
            <div className={ styles['answers'] }>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(1)} key='answer-1'>
                <Image src='/images/questions/seo_yes.svg' alt='SEO' title='SEO' width={250} height={250}/> 
                <p>
                  Ja, ich möchte mich in Google bestens Positionieren
                </p>
              </div>
              <div className={ styles['answer-box'] } onClick={() => handleAnswerClick(0)} key='answer-2'>
                <Image src='/images/questions/seo_no.svg' alt='No Seo'title='SEO'  width={250} height={250}/> 
                <p>
                  Nein, SEO ist nicht notwendig
                </p>
              </div>      
            </div>
            <div className={ styles['info'] }>
              <button onClick={handleBackClick}>Zurück</button>
            </div>
         </div>

         <div className={ styles.ergebnis } style={{ display: questionIndex === 6 ? 'block' : 'none' }}> 
          <h2>Die Kosten für Ihre Anfrage würden ca. <span>{((specialCondition ? summe / 1.8 : summe) * 220).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span> Euro betragen.</h2>
          <p>Bitte bedenken Sie, dass die Kosten nach einer detaillierten Kostenschätzung von der Online-Kalkulation abweichen können.</p>
          <div className={styles.buttons}>
            <button onClick={resetCalculation}>Nochmal berechnen</button>
            {button ? <a href={`${button}?subject=DevKid - Website erstellen lassen`} className={styles['cta-button']} title='Website erstellen lassen'>Website erstellen lassen</a> : null} 
          </div>
         </div>

      </div>
      <div className={styles['more-info']}>
        <Image src='/images/questions/headset.svg' alt='contact' title="Website Preise" width={150} height={150}/> 
        <h3>Erfahren Sie mehr über die Website Kosten in einem persönlichen Erstgespräch.</h3>
        {button ? <a href={`${button}?subject=DevKid - Website erstellen lassen`} className={'cta-button'} title='Erstgespräch'>Kostenloses Erstgespräch anfragen</a> : null} 
      </div>
    </div>
  );
}