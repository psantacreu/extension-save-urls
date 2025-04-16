import { Message, Response } from '@/types/messages';
import { DEFAULT_CATEGORIES } from '@/types/storage';
import { getStorageData, setStorageData } from '@/services/chrome';

// Listen for extension installation
chrome.runtime.onInstalled.addListener(async () => {
    console.log('Extension installed');
    
    // Initialize default categories if they don't exist
    const data = await getStorageData();
    if (!data.categories || data.categories.length === 0) {
        // Create a mutable copy of DEFAULT_CATEGORIES
        const mutableDefaultCategories = [...DEFAULT_CATEGORIES];
        await setStorageData({ categories: mutableDefaultCategories });
    }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message: Message, _, sendResponse: (response: Response) => void) => {
    try {
        if (message.type === 'SUMMARIZE_URL') {
            sendResponse({ status: 'received' });
        } else {
            sendResponse({ status: 'error', error: 'Unknown message type' });
        }
    } catch (error) {
        sendResponse({ status: 'error', error: 'Internal error occurred' });
    }
    return true;
}); 