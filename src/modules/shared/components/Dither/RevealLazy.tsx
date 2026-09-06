"use client";

import dynamic from "next/dynamic";

const DitherReveal = dynamic(() => import("./DitherReveal"), { ssr: false });

export default DitherReveal;
