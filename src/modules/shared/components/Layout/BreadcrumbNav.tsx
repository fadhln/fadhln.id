import Link from "next/link";

export type BreadcrumbNavProps = {
  section: string;
  sectionHref: string;
  title?: string;
};

function BreadcrumbNav({ section, sectionHref, title = "" }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-bg-elevated shadow-border-b h-12 w-full">
      <div className="text-on-bg-secondary mx-3 flex h-full w-full max-w-5xl items-center gap-2 truncate text-sm sm:mx-4">
        <Link href={sectionHref} className="hover:text-on-bg transition-colors">
          {section}
        </Link>
        <span aria-hidden className="text-on-bg-muted">
          /
        </span>
        <span aria-current="page" className="text-on-bg">
          {title}
        </span>
      </div>
    </nav>
  );
}

export default BreadcrumbNav;
