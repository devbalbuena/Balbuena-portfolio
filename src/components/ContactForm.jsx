import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { primaryBtn, cardBody } from '../lib/ui';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : null;

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500';

export default function ContactForm() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      showToast('Contact form is not configured yet.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error('Submit failed');

      showToast('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      showToast('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-gray-100 dark:border-white/10">
      <p className={`text-xs ${cardBody}`}>Send a message</p>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${inputClass} resize-none`}
      />
      <button type="submit" disabled={submitting} className={`${primaryBtn} w-full justify-center`}>
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
