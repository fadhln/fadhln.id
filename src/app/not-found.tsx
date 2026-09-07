import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-on-bg-muted font-mono text-xs tracking-widest uppercase">404</p>
      <h1 className="text-on-bg text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-on-bg-secondary max-w-md">
        The page you are looking for does not exist or was moved.
      </p>
      <Link href="/" className="text-primary hover:text-on-bg text-sm underline">
        Back to home
      </Link>
    </div>
  );
}
