import { PageLayout } from "-/modules/shared/components/Layout";
import Stagger, { StaggerItem } from "-/modules/shared/components/Stagger";
import { SOCIAL_LINKS } from "-/modules/shared/constants/social";

import ContactForm from "./components/ContactForm";

function Contact() {
  return (
    <PageLayout
      cover={{
        number: "08",
        title: "Contact",
        animateTitle: true,
        titleStaggerDelay: 0.06,
      }}
    >
      <Stagger className="flex flex-col gap-10" staggerDelay={0.12}>
        <StaggerItem>
          <div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Hi. Hola. Bonjour. こんにちは.
            </h2>
            <p className="text-on-bg-secondary mt-4 tracking-normal">
              Reach out for collaboration, conversation, and contact.
            </p>
          </div>
        </StaggerItem>
        <StaggerItem>
          <ContactForm />
        </StaggerItem>
        <StaggerItem>
          <section className="border-border border-t pt-6" aria-labelledby="social-links-title">
            <p
              id="social-links-title"
              className="text-on-bg-muted font-mono text-xs tracking-widest uppercase"
            >
              Elsewhere
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-bg-secondary text-on-bg-secondary hover:border-border-hover hover:text-on-bg border p-3 text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </section>
        </StaggerItem>
      </Stagger>
    </PageLayout>
  );
}

export default Contact;
