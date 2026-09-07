import type { PropsWithChildren } from "react";

import BreadcrumbNav, { type BreadcrumbNavProps } from "./BreadcrumbNav";
import Cover from "./Cover";

type PageLayoutProps = {
  cover?: {
    number?: string;
    title: string;
    animateTitle?: boolean;
    titleStaggerDelay?: number;
  };
  breadcrumbs?: BreadcrumbNavProps;
};

function PageLayout({ children, cover, breadcrumbs }: PropsWithChildren<PageLayoutProps>) {
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      {cover && (
        <Cover
          number={cover.number}
          title={cover.title}
          animateTitle={cover.animateTitle}
          titleStaggerDelay={cover.titleStaggerDelay}
        />
      )}

      <div className="bg-bg border-border mx-6 w-full max-w-5xl flex-1 border-x">
        {breadcrumbs && <BreadcrumbNav {...breadcrumbs} />}
        <div className="p-12">{children}</div>
      </div>
    </div>
  );
}

export default PageLayout;
