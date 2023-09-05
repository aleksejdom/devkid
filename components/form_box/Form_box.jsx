import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './Form_box.module.scss'; // Annahme, dass der Stylesheet-Name Form_box.css ist
import Link from 'next/link';

export default function Form_box() {
  const [state, handleSubmit] = useForm("xyyqjnkd");
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState(null);
  const [agreeForMarketing, setAgreeForMarketing] = useState(false);



  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
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
    <div className={styles["form-box"]}>
      <h2>Kontaktformular</h2>
      <div className={styles["wrapper"]}>
        <form onSubmit={onFormSubmit}>
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
      </div>
    </div>
  );
}

Form_box.displayName = 'Form Box';