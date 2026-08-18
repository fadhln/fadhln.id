import type { PropsWithChildren } from "react";

import Cover from "./Cover";

type PageLayoutProps = {
  cover?: {
    number?: string;
    title: string;
  };
};

function PageLayout({ children, cover }: PropsWithChildren<PageLayoutProps>) {
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      {cover && <Cover number={cover.number} title={cover.title} />}
      <div className="bg-bg border-border mx-6 w-full max-w-5xl flex-1 border-x p-12">
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
