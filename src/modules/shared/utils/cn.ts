import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, filtering out any falsy values.
 * @param classes An array of class names, which may be strings or falsy values.
 * @returns A single string containing all truthy class names separated by spaces.
 */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
