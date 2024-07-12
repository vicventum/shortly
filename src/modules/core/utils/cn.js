import { twMerge } from 'tailwind-merge'
// import { clsx, ClassValue } from "clsx";
import { clsx } from 'clsx'

// export function cn(...inputs: ClassValue[]) {
export function cn (...inputs) {
  return twMerge(clsx(inputs))
}
