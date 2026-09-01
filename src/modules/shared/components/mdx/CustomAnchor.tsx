import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import cn from "../../utils/cn";

const twClass = "hover:text-on-bg underline transition-colors";

function CustomAnchor({ href, className, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href?.startsWith("http") || href?.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(className, twClass)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }

  return <Link href={href ?? ""} className={cn(className, twClass)} {...props} />;
}

export default CustomAnchor;
