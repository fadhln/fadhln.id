import { PageLayout } from "-/modules/shared/components/Layout";
import Stagger, { StaggerItem } from "-/modules/shared/components/Stagger";

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
      </Stagger>
    </PageLayout>
  );
}

export default Contact;
