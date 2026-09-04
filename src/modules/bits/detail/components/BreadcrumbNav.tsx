import Link from "next/link";

function BreadcrumbNav({ title = "" }: { title?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-bg-elevated shadow-border-b w-full py-2.5">
      <div className="text-on-bg-secondary mx-6 flex w-full max-w-5xl items-center gap-2 text-sm">
        <Link href="/bits" className="hover:text-on-bg transition-colors">
          Bits
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
