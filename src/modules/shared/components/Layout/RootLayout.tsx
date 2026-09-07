import cn from "-/modules/shared/utils/cn";

import Footer from "./Footer";
import styles from "./RootLayout.module.css";
import SideBar from "./SideBar";

function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <body className="relative mx-auto flex min-h-full max-w-[120rem]">
      <SideBar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className={cn("flex min-h-svh flex-col pt-12 md:pt-0", styles.diagonalStripes)}>
          {children}
        </main>
        <Footer />
      </div>
    </body>
  );
}

export default RootLayout;
