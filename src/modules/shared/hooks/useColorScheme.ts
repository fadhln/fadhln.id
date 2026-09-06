import { useEffect, useState } from "react";

export type ColorScheme = "dark" | "light";

function useColorScheme(): ColorScheme {
  const [scheme, setScheme] = useState<ColorScheme>("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateScheme = () => setScheme(media.matches ? "dark" : "light");

    updateScheme();
    media.addEventListener("change", updateScheme);
    return () => media.removeEventListener("change", updateScheme);
  }, []);

  return scheme;
}

export default useColorScheme;
