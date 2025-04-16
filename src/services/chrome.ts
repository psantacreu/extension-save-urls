import { Tab, ErrorState, ErrorCode } from '@/types';
import { StorageData } from '@/types/storage';

/**
 * Gets the currently active tab in the current window
 * @returns A promise that resolves to the current tab information
 * @throws ErrorState if the tab cannot be retrieved
 */
export const getCurrentTab = async (): Promise<Tab> => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab) {
            throw new ErrorState({
                message: 'No active tab found',
                code: ErrorCode.TAB_ERROR
            });
        }

        return {
            id: tab.id,
            url: tab.url,
            title: tab.title
        };
    } catch (error) {
        if (error instanceof ErrorState) {
            throw error;
        }
        throw new ErrorState({
            message: 'Failed to get current tab',
            code: ErrorCode.TAB_ERROR
        });
    }
};

/**
 * Opens the extension's options page
 * @throws ErrorState if the options page cannot be opened
 */
export const openOptionsPage = (): void => {
    try {
        chrome.runtime.openOptionsPage();
    } catch (error) {
        throw new ErrorState({
            message: 'Failed to open options page',
            code: ErrorCode.UNKNOWN_ERROR
        });
    }
};

export const getStorageData = async (): Promise<StorageData> => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['openaiApiKey', 'categories', 'savedUrls'], (result: StorageData) => {
            resolve(result);
        });
    });
};

export const setStorageData = async (data: Partial<StorageData>): Promise<void> => {
    return new Promise((resolve) => {
        chrome.storage.sync.set(data, () => {
            resolve();
        });
    });
}; 