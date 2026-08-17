function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <div className="bg-brand text-text-inverse dark:text-text-primary h-64 w-full">
        <div className="mx-auto grid h-full max-w-5xl grid-cols-2 gap-4 p-8">
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
      <div className="bg-surface border-border mx-6 w-full max-w-5xl flex-1 border-x p-8">
        <div>
          <p className="text-4xl font-semibold">Hey! I'm Fadhlan.</p>
          <p className="text-text-secondary mt-1 text-4xl font-medium">
            Software Engineer from <span className="text-text-primary">Indonesia.</span>
          </p>
          <p className="mt-4 md:max-w-1/2">
            Helping organizations to ship friendly, reliable, and scalable software. Always open to
            exciting new challenges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
