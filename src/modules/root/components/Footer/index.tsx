import Image from "next/image";

import BackToTop from "./BackToTop";

const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://linkedin.com/in/fadhln" },
  { name: "GitHub", url: "https://github.com/fadhln" },
  { name: "Threads", url: "https://threads.net/@m_fadhln" },
  { name: "Instagram", url: "https://instagram.com/m_fadhln" },
] as const;

function Footer() {
  return (
    <footer className="shadow-border-t text-muted-foreground dark:bg-surface-tertiary dark:text-text-primary bg-text-primary text-text-inverse text-xs tracking-tight">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 py-6 sm:grid-cols-3 md:grid-cols-4">
        <div>
          <div className="flex h-fit items-center gap-1">
            <div className="bg-brand h-1 rounded-full p-1" />
            <p className="font-medium">fadhln.id</p>
          </div>
          <p className="text-text-inverse/50 dark:text-text-primary/50 md:hidden">
            Commit{" "}
            <span className="font-mono uppercase underline">
              {process.env.NEXT_PUBLIC_GIT_HASH}
            </span>
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-text-inverse/50 dark:text-text-primary/50">
            Commit{" "}
            <span className="font-mono uppercase underline">
              {process.env.NEXT_PUBLIC_GIT_HASH}
            </span>
          </p>
        </div>
        <div>
          <p>Contact Me</p>
          <a
            href="mailto:contact@fadhln.id"
            className="text-text-inverse/50 dark:text-text-primary/50 dark:hover:text-text-primary hover:text-text-inverse transition-colors"
          >
            contact@fadhln.id
          </a>
        </div>
        <ul className="col-span-2 grid grid-cols-4 flex-col gap-4 sm:col-span-1 sm:flex sm:gap-0">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.name} className="hover:underline">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-text-secondary dark:border-border mx-auto grid max-w-5xl grid-cols-2 gap-4 border-t px-8 py-6 sm:grid-cols-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="relative h-8 w-8">
            <Image src="/logo.svg" alt="fadhln.id logo" fill className="object-contain" />
          </div>
        </div>
        <div className="text-text-inverse/50 dark:text-text-primary/50 hidden sm:block">
          <p>© {new Date().getFullYear()} Fadhlan</p>
        </div>
        <div>
          <BackToTop />
          <div className="text-text-inverse/50 dark:text-text-primary/50 block sm:hidden">
            <p>© {new Date().getFullYear()} Fadhlan</p>
          </div>
        </div>
      </div>
      <div className="bg-brand mt-6 h-2 w-full" />
    </footer>
  );
}

export default Footer;
