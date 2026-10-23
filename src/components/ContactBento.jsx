import { motion } from 'framer-motion';
import { Contact, Mail, Phone, Share2, GitBranch as Github, Link2 as Linkedin, Code2, ArrowUpRight } from 'lucide-react';
import { springFadeIn } from '../motion/variants';
import { cardBase, sectionIcon, sectionTitle, accentIcon, linkAccent } from '../lib/ui';
import ContactForm from './ContactForm';
import { useToast } from '../context/ToastContext';
import SpotlightCard from './SpotlightCard';

// Email split into parts to prevent bot scraping — joined at runtime only
const EMAIL_USER = 'balbuenadexter2';
const EMAIL_DOMAIN = 'gmail.com';
const getEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`;

export default function ContactBento() {
  const { showToast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(getEmail());
      showToast('Email copied to clipboard!');
    } catch {
      showToast('Could not copy email.');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Portfolio link copied to clipboard!');
    } catch {
      showToast('Could not copy link.');
    }
  };

  return (
    <section id="contact" className="mb-14">
      <div className="flex items-center gap-2 mb-4 group">
        <Contact className={sectionIcon} size={20} />
        <h3 className={sectionTitle}>Let's Connect</h3>
      </div>

      <SpotlightCard
        as={motion.div}
        variants={springFadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={`${cardBase} p-6 sm:p-8`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Social Links (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                Have a project or opportunity?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                I'm open for freelance projects, full-stack development, and AI engineering opportunities. Reach out anytime!
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="tel:+639912131795"
                className={`group flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 text-sm text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <Phone size={16} className={accentIcon} />
                  <span>+63 991 213 1795</span>
                </div>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`w-full group flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 text-sm text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all text-left cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} className={accentIcon} />
                  <span>{getEmail()}</span>
                </div>
                <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">Copy</span>
              </button>

              <a
                href="https://github.com/devbalbuena"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 text-sm text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <Github size={16} className={accentIcon} />
                  <span>github.com/devbalbuena</span>
                </div>
                <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://linkedin.com/in/dexterbalbuena"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 text-sm text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <Linkedin size={16} className={accentIcon} />
                  <span>linkedin.com/in/dexterbalbuena</span>
                </div>
                <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://leetcode.com/u/devbalbuena/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 text-sm text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <Code2 size={16} className={accentIcon} />
                  <span>leetcode.com/u/devbalbuena</span>
                </div>
                <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-medium text-xs transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <Share2 size={14} className={accentIcon} />
              Share Portfolio Link
            </button>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 lg:pl-4 lg:border-l border-slate-200/70 dark:border-white/10">
            <ContactForm />
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
