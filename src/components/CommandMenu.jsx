import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { FolderCode, User, Image, Moon, Sun, Mail, Download, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

// Email split into parts to prevent bot scraping — joined at runtime only
const EMAIL_USER = 'balbuenadexter2';
const EMAIL_DOMAIN = 'gmail.com';
const getEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`;

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(getEmail());
      showToast('Email copied to clipboard!');
    } catch {
      showToast('Could not copy email.');
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Resume downloading...');
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={() => setOpen(false)}
      />
      
      <Command 
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-100 dark:border-white/10"
        loop
      >
        <div className="flex items-center border-b border-gray-100 dark:border-white/10 px-3">
          <Command.Input 
            placeholder="Type a command or search..." 
            className="w-full bg-transparent p-4 text-sm outline-none placeholder:text-gray-400 dark:text-slate-100 dark:placeholder:text-slate-500 border-none focus:ring-0"
            autoFocus
          />
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="p-4 text-center text-sm text-gray-500 dark:text-slate-400">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation">
            <Command.Item 
              onSelect={() => runCommand(() => scrollTo('projects'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 mt-1 text-sm text-slate-800 dark:text-slate-200 aria-selected:bg-gray-100 dark:aria-selected:bg-slate-800 transition-colors"
            >
              <FolderCode size={16} />
              Projects
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => scrollTo('about'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 mt-1 text-sm text-slate-800 dark:text-slate-200 aria-selected:bg-gray-100 dark:aria-selected:bg-slate-800 transition-colors"
            >
              <User size={16} />
              About Me
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => scrollTo('gallery'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 mt-1 text-sm text-slate-800 dark:text-slate-200 aria-selected:bg-gray-100 dark:aria-selected:bg-slate-800 transition-colors"
            >
              <Image size={16} />
              Gallery
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions" className="mt-2 border-t border-gray-100 dark:border-white/10 pt-2">
            <Command.Item 
              onSelect={() => runCommand(toggleTheme)}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 mt-1 text-sm text-slate-800 dark:text-slate-200 aria-selected:bg-gray-100 dark:aria-selected:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              Toggle {isDark ? 'Light' : 'Dark'} Mode
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(handleCopyEmail)}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 mt-1 text-sm text-slate-800 dark:text-slate-200 aria-selected:bg-gray-100 dark:aria-selected:bg-slate-800 transition-colors"
            >
              <Mail size={16} />
              Copy Email Address
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(handleDownloadResume)}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 mt-1 text-sm text-slate-800 dark:text-slate-200 aria-selected:bg-gray-100 dark:aria-selected:bg-slate-800 transition-colors"
            >
              <Download size={16} />
              Download Resume
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => window.open('https://leetcode.com/u/devbalbuena/', '_blank'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 mt-1 text-sm text-slate-800 dark:text-slate-200 aria-selected:bg-gray-100 dark:aria-selected:bg-slate-800 transition-colors"
            >
              <Code2 size={16} />
              Open LeetCode Profile
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
