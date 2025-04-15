import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names and resolves Tailwind CSS conflicts
 * @param inputs - Class names to merge
 * @returns Merged class names string
 */
export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
}; 