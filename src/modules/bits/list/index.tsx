import BitCard from "-/modules/bits/components/BitCard";
import { getBitDate, getBits } from "-/modules/bits/utils";
import { PageLayout } from "-/modules/shared/components/Layout";

function BitsList() {
  const bitPosts = getBits();

  return (
    <PageLayout
      cover={{
        number: "03",
        title: "Bits",
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {bitPosts.map((bit) => (
          <BitCard
            key={bit.slug}
            href={`/bits/${bit.slug}`}
            title={bit.title ?? bit.slug}
            createdAt={getBitDate(bit.created_at)}
            updatedAt={getBitDate(bit.updated_at)}
            placeholder={bit.placeholder}
            video={bit.video}
          />
        ))}
        <div className="border-border bg-bg-elevated overflow-hidden rounded-xs border">
          <div className="bg-bg-secondary text-on-bg-muted flex h-full items-center justify-center font-mono text-xs tracking-wider uppercase">
            More coming soon ...
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default BitsList;
