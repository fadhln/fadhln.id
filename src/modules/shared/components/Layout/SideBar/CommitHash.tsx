function CommitHash() {
  const date = new Date(process.env.NEXT_PUBLIC_GIT_DATE ?? "").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="shadow-border-b text-xxs p-4 font-mono tracking-wider uppercase">
      <p>
        Latest Commit:{" "}
        <a
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/fadhln/fadhln.id/commit/${process.env.NEXT_PUBLIC_GIT_HASH}`}
        >
          {process.env.NEXT_PUBLIC_GIT_HASH}
        </a>
      </p>
      <p className="text-on-bg-secondary">Updated: {date}</p>
    </div>
  );
}

export default CommitHash;
