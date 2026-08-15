function CommitHash() {
  const date = new Date(process.env.NEXT_PUBLIC_GIT_DATE ?? "").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="shadow-border-b text-xxs p-4 font-mono tracking-wider uppercase">
      <p>
        Latest Commit: <span className="underline">{process.env.NEXT_PUBLIC_GIT_HASH}</span>
      </p>
      <p className="text-text-secondary">Updated: {date}</p>
    </div>
  );
}

export default CommitHash;
