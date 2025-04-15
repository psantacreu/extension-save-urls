import { Message, Response } from '../types/messages';

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
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
    return true; // Required for async response
}); 