import React, { useEffect } from 'react';
import styles from './Form_box.module.scss';
import { useForm, ValidationError } from '@formspree/react';


export default function Form_box() {
   
  
  const [state, handleSubmit] = useForm("xyyqjnkd");
  
  if (state.succeeded) {
    return <p>Nachricht wurde verschickt!</p>;
  }

  return (
    <div className={styles['form-box']}>
      <h2>Kontaktformular</h2>
      <div className={styles["wrapper"]}>
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
          
          <button type="submit" disabled={state.submitting}>
            Nachricht senden
          </button>
        </form> 
      </div>
     

    </div>
  );
}

Form_box.displayName = 'Form Box';