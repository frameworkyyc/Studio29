import { site } from '@/config/site';
import type { SubmitResult } from './booking/types';

/**
 * POSTs JSON to the configured endpoint. Returns `sent` ONLY on a 2xx response.
 * With no endpoint configured it returns `not-configured` so the UI never
 * pretends a message was delivered.
 */
export async function postForm(kind: 'booking' | 'contact', payload: Record<string, unknown>): Promise<SubmitResult> {
  if (!site.inquiryEndpoint) return { status: 'not-configured' };
  try {
    const res = await fetch(site.inquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ kind, ...payload }),
    });
    if (res.ok) return { status: 'sent' };
    if (res.status === 503) return { status: 'not-configured' };
    return { status: 'error', message: 'The message could not be sent. Please try again or reach us on Instagram.' };
  } catch {
    return { status: 'error', message: 'We could not reach the server. Please check your connection and try again.' };
  }
}
