import Link from "next/link";

import { PersonIcon } from "@radix-ui/react-icons";

import { Button } from "../shared/components/Button";
import { PageLayout } from "../shared/components/Layout";
import BitsSection from "./components/BitsSection";
import CopyEmail from "./components/CopyEmail";
import PostsSection from "./components/PostsSection";

function Home() {
  return (
    <PageLayout
      cover={{
        number: "01",
        title: "Index",
      }}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-start">
        <div className="max-w-2xl">
          <p className="text-4xl font-semibold">Hey! I'm Fadhlan.</p>
          <p className="text-on-bg-secondary mt-1 text-4xl font-medium">
            Software Engineer from <span className="text-on-bg">Indonesia.</span>
          </p>
          <p className="mt-2 text-lg tracking-tight md:max-w-xl">
            Helping organizations to ship friendly, reliable, and scalable software. Always open to
            exciting new challenges.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="primary" render={<Link href={"/about"} />} nativeButton={false}>
              About Me
            </Button>
            <CopyEmail />
          </div>
        </div>
        <div className="border-border bg-bg-elevated relative size-24 shrink-0 overflow-hidden border sm:size-28">
          <div className="text-on-bg-muted flex h-full w-full flex-col items-center justify-center gap-1">
            <PersonIcon className="size-7" />
            <span className="font-mono text-[9px] tracking-wider uppercase">Photo</span>
          </div>
        </div>
      </div>
      <BitsSection />
      <PostsSection />
    </PageLayout>
  );
}

export default Home;
