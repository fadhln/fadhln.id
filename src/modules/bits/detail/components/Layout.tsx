function BitsDetailLayout({ children }: LayoutProps<"/">) {
  return (
    <body className="relative mx-auto flex min-h-full max-w-[120rem]">
      <div className="flex flex-1 flex-col">
        <main className="flex min-h-svh flex-col">{children}</main>
      </div>
    </body>
  );
}

export default BitsDetailLayout;
