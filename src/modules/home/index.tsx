import Link from "next/link";

import { Button } from "../shared/components/Button";
import { PageLayout } from "../shared/components/Layout";
import CopyEmail from "./components/CopyEmail";

function Home() {
  return (
    <PageLayout
      cover={{
        number: "01",
        title: "Index",
      }}
    >
      <div>
        <p className="text-4xl font-semibold">Hey! I'm Fadhlan.</p>
        <p className="text-on-bg-secondary mt-1 text-4xl font-medium">
          Software Engineer from <span className="text-on-bg">Indonesia.</span>
        </p>
        <p className="mt-2 text-lg tracking-tight md:max-w-1/2">
          Helping organizations to ship friendly, reliable, and scalable software. Always open to
          exciting new challenges.
        </p>
      </div>
      <div className="mt-6 flex gap-3">
        <Button variant="primary" render={<Link href={"/about"} />} nativeButton={false}>
          About Me
        </Button>
        <CopyEmail />
      </div>
    </PageLayout>
  );
}

export default Home;
