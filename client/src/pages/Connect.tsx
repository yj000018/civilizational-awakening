/**
 * Connect — contact form with Formspree
 * Design: editorial, minimal, warm
 * Formspree endpoint: set VITE_FORMSPREE_ID in your .env file
 * e.g. VITE_FORMSPREE_ID=xpwzgkbj
 * Get your form ID at https://formspree.io
 */

import Layout from '@/components/Layout';
import { useState } from 'react';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
const FORMSPREE_ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const DOMAINS = [
  'Consciousness & Philosophy',
  'AI & Cognition',
  'Civilization Design',
  'Art & Beauty',
  'Collective Intelligence',
  'Education & Human Development',
  'Ecology & Systems',
  'Other',
];

export default function Connect() {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    domain: '',
    intention: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setState('error');
      return;
    }
    setState('submitting');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setState('success');
        setForm({ name: '', email: '', domain: '', intention: '', message: '' });
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  return (
    <Layout>
      <div className="container py-24">
        <div className="max-w-2xl">
          <p
            className="text-xs uppercase tracking-widest mb-8"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Connect
          </p>

          <h1
            className="mb-8"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Who I am looking to meet
          </h1>

          <p
            className="text-xl mb-10"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              opacity: 0.7,
              lineHeight: 1.7,
            }}
          >
            I am looking to connect with thinkers, builders, artists, researchers and actors of change
            exploring human flourishing, consciousness, AI, collective intelligence and the future of civilization.
          </p>

          {/* Profiles */}
          <div
            className="border-l-2 pl-6 mb-14 space-y-3"
            style={{ borderColor: 'var(--accent)' }}
          >
            {[
              'Researchers and philosophers of consciousness and mind',
              'Builders working on AI for human flourishing',
              'Artists exploring the intersection of technology and beauty',
              'Architects of new social, educational and civilizational systems',
              'Actors of change working on collective intelligence',
            ].map((item) => (
              <p key={item} className="text-sm" style={{ opacity: 0.65 }}>
                {item}
              </p>
            ))}
          </div>

          {/* Form */}
          {!FORMSPREE_ENDPOINT && (
            <div
              className="mb-6 p-4 border rounded-sm text-sm"
              style={{ borderColor: 'var(--destructive)', color: 'var(--destructive)', opacity: 0.8 }}
            >
              ⚠ Contact form not yet configured. Set <code>VITE_FORMSPREE_ID</code> in your environment to activate.
            </div>
          )}
          {state === 'success' ? (
            <div
              className="p-8 border rounded-sm"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
            >
              <p
                className="text-xl mb-3"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Message received.
              </p>
              <p className="text-sm" style={{ opacity: 0.55 }}>
                Thank you for reaching out. I will read your message carefully and respond when the time is right.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-widest mb-2"
                    style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border rounded-sm outline-none transition-all duration-150"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--card)',
                      color: 'var(--foreground)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-widest mb-2"
                    style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border rounded-sm outline-none transition-all duration-150"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--card)',
                      color: 'var(--foreground)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>

              {/* Domain */}
              <div>
                <label
                  htmlFor="domain"
                  className="block text-xs uppercase tracking-widest mb-2"
                  style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                >
                  Domain of Work
                </label>
                <select
                  id="domain"
                  name="domain"
                  value={form.domain}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border rounded-sm outline-none transition-all duration-150"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--card)',
                    color: form.domain ? 'var(--foreground)' : 'var(--muted-foreground)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                >
                  <option value="" disabled>Select your domain...</option>
                  {DOMAINS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Intention */}
              <div>
                <label
                  htmlFor="intention"
                  className="block text-xs uppercase tracking-widest mb-2"
                  style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                >
                  Your Intention
                </label>
                <input
                  id="intention"
                  name="intention"
                  type="text"
                  placeholder="What brings you here? What are you working on?"
                  value={form.intention}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border rounded-sm outline-none transition-all duration-150"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--foreground)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-widest mb-2"
                  style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Share what moves you, what you are building, or what you would like to explore together."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border rounded-sm outline-none transition-all duration-150 resize-none"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--foreground)',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.7,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Error */}
              {state === 'error' && (
                <p className="text-sm" style={{ color: 'var(--destructive)' }}>
                  Something went wrong. Please try again or write directly to the email in the footer.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={state === 'submitting'}
                className="inline-block text-sm border px-8 py-3 rounded-sm transition-all duration-200 hover:opacity-60 disabled:opacity-40"
                style={{
                  borderColor: 'var(--foreground)',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: 'transparent',
                  color: 'var(--foreground)',
                }}
              >
                {state === 'submitting' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
