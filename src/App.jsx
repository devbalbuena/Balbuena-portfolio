import { motion } from 'framer-motion';
import Header from './components/Header';
import Projects from './components/Projects';
import About from './components/About';
import CurrentProjects from './components/CurrentProjects';
import Gallery from './components/Gallery';
import RightSidebar from './components/RightSidebar';
import DarkModeToggle from './components/DarkModeToggle';
import ScrollProgressBar from './components/ScrollProgressBar';
import { pageSection } from './motion/variants';

export default function App() {
  return (
    <motion.div
      className="relative isolate min-h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.05 },
        },
      }}
    >
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] -z-10 h-96 w-96 rounded-full blur-3xl bg-blue-400/15 dark:bg-blue-500/15" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] -z-10 h-96 w-96 rounded-full blur-3xl bg-blue-400/15 dark:bg-blue-500/15" />

      <ScrollProgressBar />
      <DarkModeToggle />

      <motion.div
        className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-20"
        variants={pageSection}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-12 relative items-start"
          variants={pageSection}
        >
          <motion.div
            className="w-full min-w-0 lg:col-span-8"
            variants={pageSection}
          >
            <Header />
            <Projects />
            <About />
            <CurrentProjects />
            <Gallery />
          </motion.div>

          <motion.div
            className="w-full min-w-0 lg:col-span-4 pb-10"
            variants={pageSection}
          >
            <RightSidebar />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
