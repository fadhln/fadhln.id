import Image from "next/image";
import Link from "next/link";

import { PageLayout } from "-/modules/shared/components/Layout";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

import { Badge } from "../shared/components/Badge";
import { Button } from "../shared/components/Button";
import CopyEmail from "../shared/components/CopyEmail";
import Stagger, { StaggerItem } from "../shared/components/Stagger";
import ToolItem from "./components/ToolItem";
import { CERTIFICATIONS, EDUCATION, EXPERIENCES, TOOLS } from "./data";

function About() {
  return (
    <PageLayout
      cover={{
        number: "07",
        title: "About",
        animateTitle: true,
      }}
    >
      <div className="flex flex-col gap-16">
        <StaggerItem inView>
          <section className="border-border bg-border grid gap-px border md:grid-cols-[1.4fr_0.6fr]">
            <div className="bg-primary text-on-primary flex min-h-80 flex-col justify-between p-4 sm:p-6">
              <p className="font-mono text-xs tracking-widest uppercase">Overview</p>
              <div>
                <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                  Software engineer building interfaces and web applications.
                </h2>
                <p className="text-on-primary/80 mt-4 max-w-lg text-base leading-relaxed">
                  I am Muhammad Fadhlan, based in Indonesia. I focus on frontend and full-stack
                  development, creating fast, accessible web apps that solve real operational
                  problems.
                </p>
              </div>
            </div>
            <div className="bg-bg-elevated flex flex-col justify-between p-4 sm:p-6">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-on-bg-muted font-mono text-xs tracking-widest uppercase">
                    Profile
                  </p>
                </div>
                <div className="border-border bg-bg-secondary relative aspect-4/3 w-full overflow-hidden border sm:aspect-square">
                  <StaggerItem inView className="absolute inset-0">
                    <Image
                      src="/profile.webp"
                      alt="Muhammad Fadhlan"
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </StaggerItem>
                </div>
              </div>
              <dl className="border-border mt-6 tracking-normal whitespace-nowrap">
                <div className="border-border flex items-baseline justify-between border-b py-2.5">
                  <dt className="text-on-bg-muted text-xs uppercase">Name</dt>
                  <dd className="text-sm font-medium">Fadhlan</dd>
                </div>
                <div className="border-border flex items-baseline justify-between gap-2 border-b py-2.5">
                  <dt className="text-on-bg-muted text-xs uppercase">Location</dt>
                  <dd className="text-sm font-medium">Indonesia · UTC+7</dd>
                </div>
                <div className="flex items-baseline justify-between pt-2.5">
                  <dt className="text-on-bg-muted text-xs uppercase">Status</dt>
                  <dd className="text-success-text text-sm font-medium">
                    <Badge variant="success">Open to work</Badge>
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </StaggerItem>

        <StaggerItem inView>
          <section
            aria-labelledby="background-title"
            className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]"
          >
            <div className="md:sticky md:top-8 md:self-start">
              <p className="text-on-bg-muted font-mono text-xs tracking-widest uppercase">
                01 / Background
              </p>
              <h2 id="background-title" className="mt-3 text-2xl font-semibold tracking-tight">
                What I do
              </h2>
            </div>
            <div className="text-on-bg-secondary flex flex-col gap-4 text-base leading-relaxed tracking-tight">
              <p>
                I spend most of my working hours building with TypeScript, React, Next.js, and Go. I
                care about the seam between design and engineering: translating messy requirements
                into clean UI components, keeping state predictable, and avoiding unneeded
                dependencies.
              </p>
              <p>
                This website serves as my public notebook: interactive experiments live in{" "}
                <Link href="/bits" className="text-on-bg underline underline-offset-2">
                  Bits
                </Link>
                , technical write-ups in{" "}
                <Link href="/posts" className="text-on-bg underline underline-offset-2">
                  Posts
                </Link>
                , and current projects in{" "}
                <Link href="/now" className="text-on-bg underline underline-offset-2">
                  Now
                </Link>
                .
              </p>
            </div>
          </section>
        </StaggerItem>

        <StaggerItem inView>
          <section
            aria-labelledby="experience-title"
            className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]"
          >
            <div className="md:sticky md:top-8 md:self-start">
              <p className="text-on-bg-muted font-mono text-xs tracking-widest uppercase">
                02 / Experience
              </p>
              <h2 id="experience-title" className="mt-3 text-2xl font-semibold tracking-tight">
                Where I have worked
              </h2>
              <a
                href="https://linkedin.com/in/fadhln"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-bg-secondary hover:text-on-bg mt-3 inline-block text-sm underline underline-offset-2 transition-colors"
              >
                Get my full resume on LinkedIn →
              </a>
            </div>
            <Stagger inView staggerDelay={0.12} className="flex flex-col">
              {EXPERIENCES.map((experience) => (
                <StaggerItem
                  key={experience.company}
                  className="border-border border-b py-5 first:pt-0 last:border-b-0"
                >
                  <div className="flex gap-3">
                    <div
                      className="border-border relative flex size-10 shrink-0 items-center justify-center overflow-hidden border"
                      style={{ backgroundColor: experience.companyLogoBackground }}
                    >
                      <Image
                        src={experience.companyLogo}
                        alt={`${experience.company} logo`}
                        fill
                        sizes="40px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-on-bg inline-flex items-center gap-1 text-base font-semibold hover:underline"
                      >
                        {experience.company}
                        <ExternalLinkIcon className="size-3" />
                      </a>
                      <p className="text-on-bg-secondary mt-0.5 text-sm font-medium">
                        {experience.location}
                      </p>
                      <Stagger inView staggerDelay={0.08} className="mt-4 flex flex-col">
                        {experience.roles.map((role) => (
                          <StaggerItem
                            key={`${experience.company}-${role.role}`}
                            className="border-border border-t py-4 first:pt-3 last:pb-0"
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <h3 className="text-on-bg text-sm font-semibold">{role.role}</h3>
                              <span className="text-on-bg-muted font-mono text-xs">
                                {role.period}
                              </span>
                            </div>
                            <p className="text-on-bg-secondary mt-2 text-sm leading-relaxed">
                              {role.description}
                            </p>
                          </StaggerItem>
                        ))}
                      </Stagger>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        </StaggerItem>

        <StaggerItem inView>
          <section
            aria-labelledby="tools-title"
            className="border-border grid gap-8 border-y py-8 md:grid-cols-[0.7fr_1.3fr]"
          >
            <div className="md:sticky md:top-8 md:self-start">
              <p className="text-on-bg-muted font-mono text-xs tracking-widest uppercase">
                03 / Toolkit
              </p>
              <h2 id="tools-title" className="mt-3 text-2xl font-semibold tracking-tight">
                Tools & technologies
              </h2>
              <p className="text-on-bg-secondary mt-2 max-w-xs text-sm leading-relaxed">
                Click any tool to see how I use it in production and personal projects.
              </p>
            </div>
            <Stagger inView staggerDelay={0.04} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TOOLS.map((tool) => (
                <StaggerItem key={tool.name}>
                  <ToolItem tool={tool} />
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        </StaggerItem>

        <StaggerItem inView>
          <section
            id="resume"
            aria-labelledby="credentials-title"
            className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]"
          >
            <div className="md:sticky md:top-8 md:self-start">
              <p className="text-on-bg-muted font-mono text-xs tracking-widest uppercase">
                04 / Credentials
              </p>
              <h2 id="credentials-title" className="mt-3 text-2xl font-semibold tracking-tight">
                Education & Certifications
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-on-bg-muted mb-3 font-mono text-xs tracking-wider uppercase">
                  Education
                </p>
                <Stagger inView staggerDelay={0.12} className="flex flex-col">
                  {EDUCATION.map((edu) => (
                    <StaggerItem key={edu.degree} className="border-border border-t pt-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-on-bg text-base font-semibold">{edu.degree}</h3>
                        <span className="text-on-bg-muted font-mono text-xs">{edu.period}</span>
                      </div>
                      <div className="text-on-bg-secondary mt-0.5 flex flex-wrap items-baseline justify-between gap-2 text-sm font-medium">
                        <span>
                          {edu.institution} · {edu.location}
                        </span>
                        <span className="text-on-bg font-mono text-xs">GPA {edu.gpa}</span>
                      </div>
                      <p className="text-on-bg-secondary mt-2 text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <div>
                <p className="text-on-bg-muted mb-3 font-mono text-xs tracking-wider uppercase">
                  Certifications
                </p>
                <Stagger inView staggerDelay={0.1} className="flex flex-col">
                  {CERTIFICATIONS.map((cert) => (
                    <StaggerItem
                      key={cert.title}
                      className="border-border flex flex-wrap items-baseline justify-between gap-2 border-t py-3"
                    >
                      <div>
                        <h4 className="text-on-bg text-sm font-medium">{cert.title}</h4>
                        <p className="text-on-bg-secondary mt-0.5 text-xs">{cert.issuer}</p>
                      </div>
                      <span className="text-on-bg-muted font-mono text-xs">{cert.year}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </section>
        </StaggerItem>

        <StaggerItem inView>
          <section className="bg-bg-secondary border-border grid gap-6 border p-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-on-bg-muted font-mono text-xs tracking-widest uppercase">
                Get in touch
              </p>
              <p className="mt-2 max-w-xl text-xl leading-relaxed font-medium tracking-tight">
                Looking for a frontend or full-stack engineer for your team, or want to discuss a
                project? Let's talk.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" render={<Link href="/contact" />} nativeButton={false}>
                Contact me
              </Button>
              <CopyEmail />
            </div>
          </section>
        </StaggerItem>
      </div>
    </PageLayout>
  );
}

export default About;
