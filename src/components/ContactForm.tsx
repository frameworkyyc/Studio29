import { useState, type FormEvent } from 'react';
import { Field, NotConnectedNotice } from './FormParts';
import { site } from '@/config/site';
import { postForm } from '@/lib/submit';
import { contactTopics, emptyContact, validateContact, type ContactField, type ContactValues, type Errors } from '@/lib/validation';

type State = 'idle' | 'submitting' | 'sent' | 'not-configured' | 'error';

export default function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const [errors, setErrors] = useState<Errors<ContactField>>({});
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: keyof ContactValues) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (new FormData(e.currentTarget).get('website')) return;
    const errs = validateContact(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) return void document.getElementById(`ct-${first}`)?.focus();
    setState('submitting');
    const res = await postForm('contact', { ...values, fullName: values.fullName.trim(), email: values.email.trim(), message: values.message.trim() });
    if (res.status === 'error') setErrorMsg(res.message);
    setState(res.status);
    if (res.status === 'sent') setValues(emptyContact);
  }

  if (state === 'sent') {
    return (
      <div role="status" className="border border-charcoal/25 bg-beige/60 p-8 md:p-12">
        <p className="h3">Message received.</p>
        <p className="mt-4 text-charcoal/80">Thank you. Your message has been sent and we will reply to the email address you provided.</p>
      </div>
    );
  }

  const summary = `Studio 29 inquiry\nName: ${values.fullName}\nEmail: ${values.email}\nTopic: ${values.topic}\n\n${values.message}`;
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-9" aria-label="Contact inquiry">
      <div className="grid gap-9 md:grid-cols-2">
        <Field id="ct-fullName" label="Name" error={errors.fullName}>
          {(a) => <input {...a} name="fullName" autoComplete="name" required className="field" value={values.fullName} onChange={set('fullName')} />}
        </Field>
        <Field id="ct-email" label="Email address" error={errors.email}>
          {(a) => <input {...a} name="email" type="email" autoComplete="email" required className="field" value={values.email} onChange={set('email')} />}
        </Field>
      </div>
      <Field id="ct-topic" label="Topic" error={errors.topic}>
        {(a) => (
          <select {...a} name="topic" required className="field" value={values.topic} onChange={set('topic')}>
            <option value="">Select…</option>
            {contactTopics.map((t) => <option key={t}>{t}</option>)}
          </select>
        )}
      </Field>
      <Field id="ct-message" label="Message" error={errors.message}>
        {(a) => <textarea {...a} name="message" rows={6} required className="field resize-y" value={values.message} onChange={set('message')} />}
      </Field>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {state === 'not-configured' && <NotConnectedNotice summary={summary} instagramUrl={site.instagram.url} />}
      {state === 'error' && <p role="alert" className="field-error !text-base">{errorMsg}</p>}
      <button type="submit" className="btn btn-solid" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
