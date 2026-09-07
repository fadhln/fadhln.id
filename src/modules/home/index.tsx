import Link from "next/link";

import { Button } from "../shared/components/Button";
import CopyEmail from "../shared/components/CopyEmail";
import { PageLayout } from "../shared/components/Layout";
import Stagger, { StaggerItem } from "../shared/components/Stagger";
import BitsSection from "./components/BitsSection";
import PostsSection from "./components/PostsSection";

function Home() {
  return (
    <PageLayout
      cover={{
        number: "01",
        title: "Index",
        animateTitle: true,
        titleStaggerDelay: 0.06,
      }}
    >
      <Stagger className="flex flex-col gap-16" staggerDelay={0.12}>
        <StaggerItem>
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-start">
            <div className="max-w-2xl">
              <p className="text-4xl font-semibold">Hey! I'm Fadhlan.</p>
              <p className="text-on-bg-secondary mt-1 text-4xl font-medium">
                Software Engineer from <span className="text-on-bg">Indonesia.</span>
              </p>
              <p className="mt-2 text-lg tracking-tight md:max-w-xl">
                Helping organizations to ship friendly, reliable, and scalable software. Always open
                to exciting new challenges.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="primary" render={<Link href="/about" />} nativeButton={false}>
                  About Me
                </Button>
                <CopyEmail />
              </div>
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <BitsSection />
        </StaggerItem>
        <StaggerItem>
          <PostsSection />
        </StaggerItem>
        <StaggerItem>
          <section className="bg-bg-secondary border-border grid gap-6 border p-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-on-bg-muted font-mono text-xs tracking-widest uppercase">
                Get in touch
              </p>
              <p className="mt-2 max-w-xl text-xl leading-relaxed font-medium tracking-tight">
                Have a project in mind or want to work together? Let&apos;s talk.
              </p>
            </div>
            <Button variant="primary" render={<Link href="/contact" />} nativeButton={false}>
              Contact me
            </Button>
          </section>
        </StaggerItem>
      </Stagger>
    </PageLayout>
  );
}

export default Home;
