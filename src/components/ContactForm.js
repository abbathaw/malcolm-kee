import React from 'react';
import { Button } from './Button';
import { Field } from './Field';

export const ContactForm = () => (
  <form
    name="contact-form"
    method="POST"
    action="/message-received"
    netlify-honeypot="trap"
    data-netlify="true"
    className="contact-form"
  >
    <Field label="Your Name" id="name" name="name" required />
    <Field label="Your Email" id="email" name="email" type="email" required />
    <Field
      label="Message"
      id="message"
      name="message"
      InputComponent="textarea"
      required
    />
    <input type="hidden" name="form-name" value="contact-form" />
    <div className="Toolbar center">
      <Button type="submit" color="primary" raised minWidth="wider">
        Send
      </Button>
    </div>
  </form>
);
