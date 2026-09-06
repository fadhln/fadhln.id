"use client";

import Image from "next/image";
import Link from "next/link";

import Text from "-/modules/shared/components/Text";
import useColorScheme from "-/modules/shared/hooks/useColorScheme";
import type { BitPlaceholder, BitVideo } from "-/modules/shared/types/file";

type BitCardProps = {
  href: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  video?: BitVideo;
  placeholder?: BitPlaceholder;
};

function BitCard({ href, title, createdAt, updatedAt, video, placeholder }: BitCardProps) {
  const scheme = useColorScheme();
  const sources = video?.[scheme];
  const placeholderSource = placeholder?.[scheme];

  return (
    <Link
      href={href}
      className="group border-border bg-bg-elevated hover:border-border-hover block overflow-hidden rounded-xs border transition-colors"
    >
      <div className="bg-bg-secondary relative aspect-video overflow-hidden">
        {placeholderSource && (
          <Image
            src={placeholderSource}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            unoptimized
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "blur(32px)", transform: "scale(1.1) translateZ(0)" }}
          />
        )}
        {sources ? (
          <video
            key={scheme}
            className="relative z-10 h-full w-full object-cover transition-transform duration-300 ease-out"
            autoPlay
            loop
            muted
            playsInline
            poster={placeholderSource}
          >
            <source src={sources.webm} type="video/webm" />
            <source src={sources.mp4} type="video/mp4" />
          </video>
        ) : (
          <div className="text-on-bg-muted relative z-10 flex h-full items-center justify-center font-mono text-xs tracking-wider uppercase">
            No preview
          </div>
        )}
      </div>
      <div className="bg-bg-secondary flex flex-col items-start justify-between gap-1 px-3 py-2">
        <Text
          variant="body"
          className="group-hover:text-on-bg text-on-bg-secondary transition-colors"
        >
          {title}
        </Text>
        <div className="flex w-full items-center justify-between">
          <Text variant="label" className="text-right text-[10px]">
            Updated {updatedAt}
          </Text>
          <Text variant="label" className="text-right text-[10px]">
            Created {createdAt}
          </Text>
        </div>
      </div>
    </Link>
  );
}

export default BitCard;
