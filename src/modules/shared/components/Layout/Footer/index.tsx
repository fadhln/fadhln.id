import Image from "next/image";

import { SOCIAL_LINKS } from "-/modules/shared/constants/social";

import BackToTop from "./BackToTop";

function Footer() {
  return (
    <footer className="shadow-border-t dark:bg-bg-secondary bg-on-bg text-on-bg-inverse dark:text-on-bg text-xs tracking-tight">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-3 sm:px-8 md:grid-cols-4 md:px-12">
        <div>
          <div className="flex h-fit items-center gap-1">
            <div className="bg-primary h-1 rounded-full p-1" />
            <p className="font-medium">fadhln.id</p>
          </div>
          <p className="text-on-bg-inverse/50 dark:text-on-bg/50 md:hidden">
            Commit{" "}
            <a
              className="dark:hover:text-on-bg hover:text-on-bg-inverse font-mono uppercase underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/fadhln/fadhln.id/commit/${process.env.NEXT_PUBLIC_GIT_HASH}`}
            >
              {process.env.NEXT_PUBLIC_GIT_HASH}
            </a>
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-on-bg-inverse/50 dark:text-on-bg/50">
            Commit{" "}
            <a
              className="dark:hover:text-on-bg hover:text-on-bg-inverse font-mono uppercase underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/fadhln/fadhln.id/commit/${process.env.NEXT_PUBLIC_GIT_HASH}`}
            >
              {process.env.NEXT_PUBLIC_GIT_HASH}
            </a>
          </p>
        </div>
        <div>
          <p>Connect</p>
          <a
            href="mailto:contact@fadhln.id"
            className="text-on-bg-inverse/50 dark:text-on-bg/50 dark:hover:text-on-bg hover:text-on-bg-inverse transition-colors"
          >
            contact@fadhln.id
          </a>
        </div>
        <ul className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-1 sm:flex sm:gap-0">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.name} className="hover:underline">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-on-bg-secondary dark:border-border mx-auto grid max-w-5xl grid-cols-2 gap-6 border-t px-6 py-8 sm:grid-cols-3 sm:px-8 md:grid-cols-4 md:px-12">
        <div className="md:col-span-2">
          <div className="relative h-8 w-8">
            <Image src="/logo.svg" alt="fadhln.id logo" fill className="object-contain" />
          </div>
        </div>
        <div className="text-on-bg-inverse/50 dark:text-on-bg/50 hidden sm:block">
          <p>© {new Date().getFullYear()} Fadhlan</p>
        </div>
        <div>
          <BackToTop />
          <div className="text-on-bg-inverse/50 dark:text-on-bg/50 block sm:hidden">
            <p>© {new Date().getFullYear()} Fadhlan</p>
          </div>
        </div>
      </div>
      <div className="bg-primary mt-6 h-2 w-full" />
    </footer>
  );
}

export default Footer;
