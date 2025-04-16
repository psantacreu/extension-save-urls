import { ScrapedContent } from '@/types/scraper';
import {
    findMainContent,
    extractTextContentFromPage,
    extractImagesFromPage
} from '@/lib/scraper-utils';

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.action === 'scrape') {
        try {
            const mainContent = findMainContent();
            const result: ScrapedContent = {
                text: extractTextContentFromPage(mainContent),
                images: extractImagesFromPage()
            };
            sendResponse(result);
        } catch (error: unknown) {
            sendResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
    return true; // Keep the message channel open for async response
}); 