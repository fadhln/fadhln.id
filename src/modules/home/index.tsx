function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <div className="bg-brand text-text-inverse dark:text-text-primary h-64 w-full">
        <div className="mx-auto grid h-full max-w-5xl grid-cols-2 gap-4 p-6">
          <div className="flex flex-col justify-end">
            <span className="text-text-inverse/50 dark:text-text-primary/50 font-mono text-4xl font-semibold">
              01
            </span>
          </div>
          <div className="flex flex-col justify-end">
            <h1 className="text-4xl font-semibold">Index</h1>
          </div>
        </div>
      </div>
      <div className="bg-surface border-border mx-6 w-full max-w-5xl flex-1 border-x p-6">
        Main Content
      </div>
    </div>
  );
}

export default Home;
