import React from 'react';
import { useFormInput, useErrors, useSubmitReady } from '../../hooks/useForm';
import { useSubmitState } from '../../hooks/useSubmitState';
import Spinner from '../spinner';
import styles from './contact.module.scss';
import validate from './validate';

function Form() {
  const name = useFormInput('');
  const email = useFormInput('');
  const msg = useFormInput('');

  const nameErrors = useErrors({ name: name.state }, validate);
  const emailErrors = useErrors({ email: email.state }, validate);
  const msgErrors = useErrors({ msg: msg.state }, validate);

  const submitReady = useSubmitReady(
    {
      name: name.state,
      email: email.state,
      msg: msg.state,
    },
    validate
  );

  function formSubmit(event) {
    event.preventDefault();
    return new Promise((res) => { setTimeout(res, 200); });
  }

  const [disabled, btnTxt, submitHandler] = useSubmitState(
    formSubmit,
    'Enviar',
    Spinner,
  );

  return (
    <div className={styles.form}>
      <form onSubmit={submitHandler}>
        <div className={styles.input}>
          <label htmlFor="name" className={styles.label}>
            <span className={styles.identifier}>Nombre</span>
            <input
              id="name"
              name="name"
              onChange={name.events.onChange}
              onBlur={name.events.onBlur}
              value={name.state.value}
              className={nameErrors.name ? styles.error : ''}
            />
            <span className={`${styles.errorMessage} ${nameErrors.name ? styles.active : ''}`}>
              {nameErrors.name || ''}
            </span>
          </label>
        </div>

        <div className={styles.input}>
          <label htmlFor="email" className={styles.label}>
            <span className={styles.identifier}>Email</span>
            <input
              id="email"
              name="email"
              onChange={email.events.onChange}
              onBlur={email.events.onBlur}
              value={email.state.value}
              className={emailErrors.email ? styles.error : ''}
            />
            <span className={`${styles.errorMessage} ${emailErrors.email ? styles.active : ''}`}>
              {emailErrors.email || ''}
            </span>
          </label>
        </div>

        <div className={styles.input}>
          <label htmlFor="mensaje" className={styles.label}>
            <span className={styles.identifier}>Mensaje</span>
            <textarea
              id="mensaje"
              name="mensaje"
              onChange={msg.events.onChange}
              onBlur={msg.events.onBlur}
              value={msg.state.value}
              rows="3"
              className={msgErrors.msg ? styles.error : ''}
            />
            <span className={`${styles.errorMessage} ${msgErrors.msg ? styles.active : ''}`}>
              {msgErrors.msg || ''}
            </span>
          </label>
        </div>
        <button id="submit" disabled={disabled || !submitReady} type="submit">
          {btnTxt}
        </button>
      </form>
    </div>
  );
}

function Contact() {
  return (
    <>
      <h1 className={styles.title}>¡Contáctame!</h1>
      <Form />
    </>
  );
}


export default Contact;
