function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <div className="bg-primary text-on-primary h-64 w-full">
        <div className="mx-auto grid h-full max-w-5xl grid-cols-2 gap-4 p-8">
          <div className="flex flex-col justify-end">
            <span className="text-on-primary/50 font-mono text-4xl font-semibold">01</span>
          </div>
          <div className="flex flex-col justify-end">
            <h1 className="text-4xl font-semibold">Index</h1>
          </div>
        </div>
      </div>
      <div className="bg-bg border-border mx-6 w-full max-w-5xl flex-1 border-x p-8">
        <div>
          <p className="text-4xl font-semibold">Hey! I'm Fadhlan.</p>
          <p className="text-on-bg-secondary mt-1 text-4xl font-medium">
            Software Engineer from <span className="text-on-bg">Indonesia.</span>
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
