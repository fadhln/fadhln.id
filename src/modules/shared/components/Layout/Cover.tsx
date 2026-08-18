function Cover({ number, title }: { number?: string; title: string }) {
  return (
    <div className="bg-primary text-on-primary h-64 w-full">
      <div className="mx-auto grid h-full max-w-5xl grid-cols-2 gap-4 p-8">
        <div className="flex flex-col justify-end">
          <span className="text-on-primary/50 font-mono text-4xl font-semibold">{number}</span>
        </div>
        <div className="flex flex-col justify-end">
          <h1 className="text-4xl font-semibold">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Cover;
