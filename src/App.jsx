import { motion } from 'framer-motion';
import FloatingNavbar from './components/FloatingNavbar';
import Header from './components/Header';
import QuickStatsBento from './components/QuickStatsBento';
import Projects from './components/Projects';
import ExperienceAndCertsBento from './components/ExperienceAndCertsBento';
import SkillsAndGitHubBento from './components/SkillsAndGitHubBento';
import Gallery from './components/Gallery';
import ContactBento from './components/ContactBento';
import CommandMenu from './components/CommandMenu';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTop from './components/BackToTop';
import TechGridBackground from './components/TechGridBackground';

export default function App() {
  return (
    <div className="relative isolate min-h-screen bg-[#f1f5f9] dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 selection:bg-purple-500/20 selection:text-purple-700">
      {/* Precision Tech Grid & Ambient Floating Glowing Orbs */}
      <TechGridBackground />

      {/* Global Utilities */}
      <CommandMenu />
      <ScrollProgressBar />
      <FloatingNavbar />
      <BackToTop />

      {/* Bento Grid Layout Main Content */}
      <main className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Row 1: Hero Profile Bento (8 cols) + Quick Stats Bento (4 cols) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-14">
          <div className="lg:col-span-8 flex">
            <Header />
          </div>
          <div className="lg:col-span-4 flex">
            <QuickStatsBento />
          </div>
        </section>

        {/* Row 2: Featured Projects Showcase with Category Filtering */}
        <Projects />

        {/* Row 3: About & Capstone Research + Awards & Certifications Bento */}
        <ExperienceAndCertsBento />

        {/* Row 4: Technical Skills + GitHub Activity & Languages Bento */}
        <SkillsAndGitHubBento />

        {/* Row 5: Continuous Photo Gallery Marquee Bento */}
        <Gallery />

        {/* Row 6: Contact Channels & Brevo Message Hub Bento */}
        <ContactBento />

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-200/80 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Dexter Balbuena. All rights reserved.</span>
          <span>Built with React 19, Vite, Tailwind CSS & Framer Motion</span>
        </footer>
      </main>
    </div>
  );
}
