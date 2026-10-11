import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names, letting later classes win. Used by every shadcn component. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
