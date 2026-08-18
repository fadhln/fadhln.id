import Callout from "../shared/components/Callout";
import { PageLayout } from "../shared/components/Layout";
import Text from "../shared/components/Text";

function Now() {
  return (
    <PageLayout
      cover={{
        number: "02",
        title: "Now",
      }}
    >
      <Callout withIcon title="About" variant="neutral">
        <Text>
          This is a <span className="font-medium">now page</span>, a periodically updated log of
          what I'm doing, learning, or thinking about. Learn more about now pages{" "}
          <Text
            variant="link"
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </Text>
          .
        </Text>
      </Callout>
    </PageLayout>
  );
}

export default Now;
