import BackToTop from "./BackToTop";

const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://linkedin.com/in/fadhln" },
  { name: "GitHub", url: "https://github.com/fadhln" },
  { name: "Threads", url: "https://threads.net/@m_fadhln" },
  { name: "Instagram", url: "https://instagram.com/m_fadhln" },
] as const;

function Footer() {
  return (
    <footer className="shadow-border-t text-muted-foreground dark:bg-surface-tertiary dark:text-text-primary bg-text-primary text-text-inverse pb-8 text-xs tracking-tight">
      <div className="mx-auto grid max-w-5xl grid-cols-4 gap-4 px-8 py-6">
        <div className="flex h-fit items-center gap-1">
          <div className="bg-brand h-1 rounded-full p-1" />
          <p className="font-medium">fadhln.id</p>
        </div>
        <div>
          <p className="text-text-inverse/50 dark:text-text-primary/50">
            Commit{" "}
            <span className="font-mono uppercase underline">
              {process.env.NEXT_PUBLIC_GIT_HASH}
            </span>
          </p>
        </div>
        <div>
          <p>Contact Me</p>
          <p className="text-text-inverse/50 dark:text-text-primary/50 hover:text-text-inverse transition-colors">
            contact@fadhln.id
          </p>
        </div>
        <ul className="flex flex-col">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.name} className="hover:underline">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-text-secondary dark:border-border mx-auto grid max-w-5xl grid-cols-4 gap-4 border-t px-8 py-6">
        <div className="col-span-2">1</div>
        <div className="text-text-inverse/50 dark:text-text-primary/50">
          <p>© {new Date().getFullYear()} Fadhlan</p>
        </div>
        <div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
