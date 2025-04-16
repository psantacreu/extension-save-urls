import { SavedUrl } from '@/types/storage';

/**
 * Performs a fuzzy search on URLs based on title, URL, and summary
 * @param urls Array of URLs to search through
 * @param query Search query string
 * @returns Filtered array of URLs that match the search query
 */
export const fuzzySearchUrls = (urls: SavedUrl[], query: string): SavedUrl[] => {
    if (!query.trim()) return urls;

    const searchTerms = query.toLowerCase().split(' ');
    
    return urls.filter(url => {
        const searchableText = [
            url.title,
            url.url,
            url.summary
        ].join(' ').toLowerCase();

        return searchTerms.every(term => 
            searchableText.includes(term)
        );
    });
}; 