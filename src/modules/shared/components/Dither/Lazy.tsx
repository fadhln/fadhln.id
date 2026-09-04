"use client";

import dynamic from "next/dynamic";

const Dither = dynamic(() => import("./Dither"), { ssr: false });

export default Dither;
