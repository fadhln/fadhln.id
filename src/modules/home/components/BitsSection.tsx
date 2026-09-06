import Link from "next/link";

import BitCard from "-/modules/bits/components/BitCard";
import { getBitDate, getBits } from "-/modules/bits/utils";
import { Button } from "-/modules/shared/components/Button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

function BitsSection() {
  const bits = getBits().slice(0, 2);

  return (
    <section className="mt-16" aria-labelledby="bits-title">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id="bits-title" className="text-2xl font-semibold tracking-tight">
          Bits
        </h2>
        <Button
          variant="secondary"
          size="sm"
          render={<Link href="/bits" />}
          nativeButton={false}
          icon={<ArrowRightIcon />}
          iconPosition="end"
        >
          View all
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {bits.map((bit) => (
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
      </div>
    </section>
  );
}

export default BitsSection;
