import { useEffect, useRef, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { primaryBtn, cardBody } from '../lib/ui';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

// Email split into parts to prevent bot scraping — joined at runtime only
const EMAIL_USER = 'balbuenadexter2';
const EMAIL_DOMAIN = 'gmail.com';
const getRecipientEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`;

const COOLDOWN_SECONDS = 60;
const MAX_SENDS = 3;

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500';

export default function ContactForm() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0); // seconds remaining
  const [sendCount, setSendCount] = useState(0);
  const timerRef = useRef(null);

  // Start the cooldown countdown after a successful send
  const startCooldown = () => {
    setCooldown(COOLDOWN_SECONDS);
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    timerRef.current = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [cooldown]);

  const limitReached = sendCount >= MAX_SENDS;
  const isCoolingDown = cooldown > 0;
  const isDisabled = submitting || isCoolingDown || limitReached;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const recipientEmail = getRecipientEmail();

    if (!BREVO_API_KEY) {
      showToast('Contact form is not configured yet.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: 'Portfolio Contact',
            email: recipientEmail,
          },
          to: [{ email: recipientEmail, name: 'Dexter Balbuena' }],
          replyTo: { email, name },
          subject: `Portfolio message from ${name}`,
          htmlContent: `
            <h2>New portfolio contact message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br />')}</p>
          `,
          textContent: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!response.ok) throw new Error('Submit failed');

      showToast('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setSendCount((c) => c + 1);
      startCooldown();
    } catch {
      showToast('Failed to send message. Please try again.');
      // Re-enable immediately on failure — no cooldown penalty
    } finally {
      setSubmitting(false);
    }
  };

  const getButtonLabel = () => {
    if (submitting) return 'Sending...';
    if (limitReached) return 'Message limit reached for this session';
    if (isCoolingDown) return `Wait ${cooldown}s before sending again`;
    return 'Send Message';
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
      <button
        type="submit"
        disabled={isDisabled}
        className={`${primaryBtn} w-full justify-center`}
      >
        {getButtonLabel()}
      </button>
    </form>
  );
}
