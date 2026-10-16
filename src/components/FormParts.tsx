import type { ReactNode } from 'react';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: (a11y: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode;
}

export function Field({ id, label, error, optional, hint, children }: FieldProps) {
  const describedBy = [error ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="label">
        {label} {optional && <span className="normal-case tracking-normal text-charcoal/50">(optional)</span>}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-sm text-charcoal/60">{hint}</p>}
      {error && <p id={`${id}-error`} className="field-error" role="alert">{error}</p>}
    </div>
  );
}

/** Honest status panel. 'sent' is only ever shown after a 2xx response from a real backend. */
export function NotConnectedNotice({ summary, instagramUrl }: { summary: string; instagramUrl: string }) {
  return (
    <div role="status" className="border border-charcoal/25 bg-beige/60 p-6 md:p-8">
      <p className="font-serif text-2xl">Not sent — online sending isn&rsquo;t connected yet.</p>
      <p className="mt-3 text-charcoal/80">
        Your details have <strong>not</strong> been delivered. Until the form is connected, please copy your inquiry and send it to us on Instagram.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="btn btn-solid" onClick={() => navigator.clipboard?.writeText(summary)}>Copy my inquiry</button>
        <a className="btn btn-outline" href={instagramUrl} target="_blank" rel="noopener noreferrer">Message on Instagram</a>
      </div>
    </div>
  );
}
