import BitCard from "-/modules/bits/components/BitCard";
import { getBitDate, getBits } from "-/modules/bits/utils";
import { PageLayout } from "-/modules/shared/components/Layout";
import Stagger, { StaggerItem } from "-/modules/shared/components/Stagger";

function BitsList() {
  const bitPosts = getBits();

  return (
    <PageLayout
      cover={{
        number: "03",
        title: "Bits",
        animateTitle: true,
        titleStaggerDelay: 0.06,
      }}
    >
      <Stagger inView staggerDelay={0.08} className="grid gap-6 sm:grid-cols-2">
        {bitPosts.map((bit) => (
          <StaggerItem key={bit.slug}>
            <BitCard
              href={`/bits/${bit.slug}`}
              title={bit.title ?? bit.slug}
              createdAt={getBitDate(bit.created_at)}
              updatedAt={getBitDate(bit.updated_at)}
              placeholder={bit.placeholder}
              video={bit.video}
            />
          </StaggerItem>
        ))}
        <StaggerItem>
          <div className="border-border bg-bg-elevated h-full overflow-hidden rounded-xs border">
            <div className="bg-bg-secondary text-on-bg-muted flex h-full items-center justify-center font-mono text-xs tracking-wider uppercase">
              More coming soon ...
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </PageLayout>
  );
}

export default BitsList;
