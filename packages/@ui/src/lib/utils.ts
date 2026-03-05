import { clsx, type ClassValue } from "clsx";

export type StyleValue = string | (string | false | null | undefined)[];

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
