import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './Form_box.module.scss'; // Annahme, dass der Stylesheet-Name Form_box.css ist
import Link from 'next/link';
import { gsap } from "gsap";

const Form_box = forwardRef((props, ref) => {
  const [state, handleSubmit] = useForm("xyyqjnkd");
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const lineFormRefs = useRef([]);
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState(null);
  const [agreeForMarketing, setAgreeForMarketing] = useState(false);

  const addLineRef = (el) => {
    if (el && !lineFormRefs.current.includes(el)) {
      lineFormRefs.current.push(el);
    }
  };  
 
  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  }, []);

  useEffect(() => {
    let observer;
    const currentFormRefs = lineFormRefs.current;
    const handleIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            { 
              y: 45,
              opacity: 0,
              scale: 0.5,
              transformOrigin: "left top",
              ease: "sine.out"
            },
            {
              delay: index * 0.2,
              duration: 1.6,
              y: 0,
              ease: "power3.out",
              opacity: 1,
              scale: 1,
              onComplete: () => { 
              }
            }
          );
        }
      });
    };
  
    if (currentFormRefs.length > 0) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      currentFormRefs.forEach(ref => observer.observe(ref));
    }
  
    return () => {
      if (observer) {
        currentFormRefs.forEach(ref => observer.unobserve(ref));
      }
    };
  }, []); 

  const validateCaptcha = () => {
    return parseInt(captchaValue, 10) === (num1 + num2);
  };

  const onFormSubmit = (e) => {
    if (!validateCaptcha()) {
      e.preventDefault();
      setCaptchaError("Das Ergebniss ist leider falsch.");
    } else {
      setCaptchaError(null);
      handleSubmit(e);
    }
  }; 

  if (state.succeeded) {
    return (
      <div className={styles["form-box"]}>
        <h2>Kontaktformular</h2>
        <p>Vielen Dank,<br />Ihre Nachricht wurde verschickt!</p>
      </div>
    );
  }
 

  return (
    <div className={styles["form-box"]} ref={ref}>
      <h2 ref={addLineRef}>Kontakt</h2>
      <div className={styles["wrapper"]}>
        <form onSubmit={onFormSubmit} >
          <label htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
          />
          <ValidationError 
            prefix="Email"
            field="email"
            errors={state.errors}
          />

          <label htmlFor="company">
            Firma
          </label>
          <input
            id="company"
            type="text"
            name="company"
            required
          />
          <ValidationError 
            prefix="Company"
            field="company"
            errors={state.errors}
          />

          <label htmlFor="message">
            Nachricht
          </label>
          <textarea
            id="message"
            name="message"
            required
          />
          <ValidationError 
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <label htmlFor="captcha">
            Was ist {num1} + {num2}?
          </label>

          <input
            id="captcha"
            type="text"
            onChange={(e) => setCaptchaValue(e.target.value)}
          />

          <label htmlFor="newsletter" className={styles["marketingCheckbox"]} >
            <input 
              type="checkbox" 
              id="newsletter"
              name="newsletter" 
              checked={agreeForMarketing}
              onChange={() => setAgreeForMarketing(!agreeForMarketing)}
            />
            Ich stimme freiwillig zu, dass meine Daten für Marketingzwecke gespeichert und verarbeitet werden dürfen. 
            Ich bin darüber informiert, dass ich diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen kann. 
            Weitere Informationen finden Sie in unserer <Link href="/datenschutz" target='_blank' title='datenschutz'>Datenschutzerklärung.</Link>
          </label>

          <div className={styles["error-messages"]}>
            {captchaError && <span>{captchaError}</span>}
          </div>
 
          <button type="submit" disabled={state.submitting}>
            Nachricht senden
          </button>
        </form>
        <div className={styles["contact"]}>
          <h3 ref={addLineRef}>Homepage mit Webdesign erstellen</h3>
          <p ref={addLineRef}>Haben Sie Fragen bezüglich der Erstellung Ihrer Website oder des Projektablaufs? Ich berate Sie gerne.</p>
          
          <div className={styles["contact-person"]}>
            <h4 ref={addLineRef}>Ansprechspartner:</h4>
            <p ref={addLineRef}>Aleksej Domovec</p>
            <p ref={addLineRef}>(+49) 1590 637 2543</p> 
          </div>
          <div className={styles["contact-kosten"]}>
            <h4 ref={addLineRef}>Website Kosten</h4>
            <p ref={addLineRef}>Möchten Sie die Kosten für Ihr Projekt exakt berechnen? Kontaktieren Sie uns für ein unverbindliches Angebot oder lassen Sie sich Ihre Homepage-Kosten durch unser Tool berechnen.</p>
            <Link href="/website-erstellen-lassen/was-kostet-eine-website" className={styles["cta-button"]} ref={addLineRef}>
              Homepage Kosten berechnen
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
});

Form_box.displayName = 'Form Box';
export default Form_box;