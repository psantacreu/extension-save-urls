import { ErrorCode } from '@/types';
import { ScrapedContent, ScraperError } from '@/types/scraper';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/**
 * Scrapes content and images from a web page
 * @param url - The URL to scrape
 * @returns Promise with scraped content and images
 * @throws ScraperError if scraping fails
 */
export const scrapePage = async (url: string): Promise<ScrapedContent> => {
    try {
        // Clean and handle arXiv URLs
        url = url.split('\n').filter(line => line.includes('arxiv.org/pdf/')).pop() || url;
        url = url.trim();

        if (url.includes('arxiv.org/pdf/')) {
            url = url.replace(/arxiv\.org\/pdf\//, 'arxiv.org/html/');
        }

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) {
            throw new ScraperError({
                message: 'No active tab found',
                code: ErrorCode.TAB_ERROR
            });
        }

        let lastError: Error | null = null;
        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            try {
                // Inject content script
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content-scripts/scraper.js']
                });

                // Get results from content script
                const results = await chrome.tabs.sendMessage(tab.id, { action: 'scrape' });
                if (results) {
                    return results as ScrapedContent;
                }
            } catch (error) {
                lastError = error as Error;
                if (attempt < MAX_RETRIES - 1) {
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
                }
            }
        }

        throw new ScraperError({
            message: lastError?.message || 'Failed to scrape page content',
            code: ErrorCode.SCRAPING_ERROR
        });
    } catch (error) {
        if (error instanceof ScraperError) {
            throw error;
        }
        throw new ScraperError({
            message: 'Failed to scrape page',
            code: ErrorCode.UNKNOWN_ERROR
        });
    }
}; 