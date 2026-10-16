import { useRef, useState, type FormEvent } from 'react';
import { Field, NotConnectedNotice } from './FormParts';
import { site } from '@/config/site';
import { bookingProvider } from '@/lib/booking/inquiry-provider';
import { durations, emptyBooking, productionTypes, todayISO, validateBooking, type BookingField, type BookingValues, type Errors } from '@/lib/validation';

type State = 'idle' | 'submitting' | 'sent' | 'not-configured' | 'error';

const summarise = (v: BookingValues) =>
  [
    'Studio 29 booking inquiry',
    `Name: ${v.fullName}`,
    `Email: ${v.email}`,
    v.business && `Instagram / business: ${v.business}`,
    `Type: ${v.productionType}`,
    `Preferred date: ${v.date}`,
    `Start time: ${v.startTime}`,
    `Duration: ${v.duration}`,
    `Attendees: ${v.attendees}`,
    v.details && `Details: ${v.details}`,
  ].filter(Boolean).join('\n');

export default function InquiryForm() {
  const [values, setValues] = useState<BookingValues>(emptyBooking);
  const [errors, setErrors] = useState<Errors<BookingField>>({});
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof BookingValues) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k as BookingField]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const data = new FormData(formRef.current!);
    if (data.get('website')) return; // honeypot
    const errs = validateBooking(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) return void document.getElementById(`bk-${first}`)?.focus();

    setState('submitting');
    const res = await bookingProvider.submitInquiry({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      business: values.business.trim() || undefined,
      productionType: values.productionType,
      date: values.date,
      startTime: values.startTime,
      duration: values.duration,
      attendees: Number(values.attendees),
      details: values.details.trim() || undefined,
    });
    if (res.status === 'error') setErrorMsg(res.message);
    setState(res.status);
    if (res.status === 'sent') setValues(emptyBooking);
  }

  if (state === 'sent') {
    return (
      <div role="status" className="border border-charcoal/25 bg-beige/60 p-8 md:p-12">
        <p className="h3">Inquiry received.</p>
        <p className="mt-4 text-charcoal/80">Thank you. Your inquiry has been sent and we will reply to the email address you provided.</p>
        <button type="button" className="btn btn-outline mt-8" onClick={() => setState('idle')}>Send another inquiry</button>
      </div>
    );
  }

  const input = 'field';
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-9" aria-label="Booking inquiry">
      <div className="grid gap-9 md:grid-cols-2">
        <Field id="bk-fullName" label="Full name" error={errors.fullName}>
          {(a) => <input {...a} name="fullName" autoComplete="name" required className={input} value={values.fullName} onChange={set('fullName')} />}
        </Field>
        <Field id="bk-email" label="Email address" error={errors.email}>
          {(a) => <input {...a} name="email" type="email" autoComplete="email" required className={input} value={values.email} onChange={set('email')} />}
        </Field>
      </div>
      <Field id="bk-business" label="Instagram or business name" optional>
        {(a) => <input {...a} name="business" className={input} placeholder="@yourhandle" value={values.business} onChange={set('business')} />}
      </Field>
      <Field id="bk-productionType" label="Type of photography or production" error={errors.productionType}>
        {(a) => (
          <select {...a} name="productionType" required className={input} value={values.productionType} onChange={set('productionType')}>
            <option value="">Select…</option>
            {productionTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        )}
      </Field>
      <div className="grid gap-9 md:grid-cols-2">
        <Field id="bk-date" label="Preferred date" error={errors.date}>
          {(a) => <input {...a} name="date" type="date" min={todayISO()} required className={input} value={values.date} onChange={set('date')} />}
        </Field>
        <Field id="bk-startTime" label="Preferred start time" error={errors.startTime}>
          {(a) => <input {...a} name="startTime" type="time" required className={input} value={values.startTime} onChange={set('startTime')} />}
        </Field>
        <Field id="bk-duration" label="Estimated session duration" error={errors.duration}>
          {(a) => (
            <select {...a} name="duration" required className={input} value={values.duration} onChange={set('duration')}>
              <option value="">Select…</option>
              {durations.map((d) => <option key={d}>{d}</option>)}
            </select>
          )}
        </Field>
        <Field id="bk-attendees" label="Number of attendees" error={errors.attendees} hint="Including photographers, models and crew.">
          {(a) => <input {...a} name="attendees" type="number" inputMode="numeric" min={1} max={99} required className={input} value={values.attendees} onChange={set('attendees')} />}
        </Field>
      </div>
      <Field id="bk-details" label="Additional details" optional error={errors.details}>
        {(a) => <textarea {...a} name="details" rows={5} className={`${input} resize-y`} placeholder="Tell us about your project, the rooms you'd like to use, or anything we should know." value={values.details} onChange={set('details')} />}
      </Field>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {state === 'not-configured' && <NotConnectedNotice summary={summarise(values)} instagramUrl={site.instagram.url} />}
      {state === 'error' && <p role="alert" className="field-error !text-base">{errorMsg}</p>}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-solid" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Sending…' : 'Send Inquiry'}
        </button>
        <p className="text-sm text-charcoal/60">This is an inquiry, not a reservation. Dates are not held until confirmed.</p>
      </div>
    </form>
  );
}
