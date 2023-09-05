import React, { useEffect } from 'react';
import styles from './Form_box.module.scss';
import { useForm, ValidationError } from '@formspree/react';


export default function Form_box() {
  
  // Laden des Google reCAPTCHA-Skripts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    return () => {
      // Entfernen des Skripts, wenn die Komponente unmountet wird
      document.body.removeChild(script);
    };
  }, []);
  
  const [state, handleSubmit] = useForm("xyyqjnkd");
  
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <div className={styles['form-box']}>
      <h2>Kontaktformular</h2>
      <form onSubmit={handleSubmit}>
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

        <div className={styles["g-recaptcha"]} data-sitekey="6LcaYAAoAAAAAOV4SV1D9sS6XQhlfNd3iVOR60up"></div>
        
        <button type="submit" disabled={state.submitting}>
          Nachricht senden
        </button>
      </form>
    </div>
  );
}

Form_box.displayName = 'Form Box';