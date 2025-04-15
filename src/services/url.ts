import { SavedUrl, Category } from '../types/storage';
import { getStorageData, setStorageData } from './chrome';
import { summarizeAndCategorize } from './openai';
import { ErrorState, ErrorCode } from '../types';

export const loadSavedUrls = async (): Promise<SavedUrl[]> => {
    try {
        const data = await getStorageData();
        return data.savedUrls || [];
    } catch (error) {
        throw new ErrorState({
            message: 'Failed to load saved URLs',
            code: ErrorCode.STORAGE_ERROR
        });
    }
};

export const deleteSavedUrl = async (id: string, existingUrls: SavedUrl[]): Promise<SavedUrl[]> => {
    try {
        const updatedUrls = existingUrls.filter(url => url.id !== id);
        await setStorageData({ savedUrls: updatedUrls });
        return updatedUrls;
    } catch (error) {
        throw new ErrorState({
            message: 'Failed to delete URL',
            code: ErrorCode.STORAGE_ERROR
        });
    }
};

export const saveCurrentUrl = async (
    categoryId: string,
    categories: Category[]
): Promise<SavedUrl> => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.url) {
            throw new ErrorState({
                message: 'No active URL found',
                code: ErrorCode.TAB_ERROR
            });
        }

        const data = await getStorageData();
        if (!data.openaiApiKey) {
            throw new ErrorState({
                message: 'OpenAI API key not found',
                code: ErrorCode.API_KEY_MISSING
            });
        }

        const { summary, categoryId: suggestedCategoryId } = await summarizeAndCategorize(
            `${tab.title}\n${tab.url}`,
            categories,
            data.openaiApiKey
        );

        const newUrl: SavedUrl = {
            id: Date.now().toString(),
            url: tab.url,
            title: tab.title || 'Untitled',
            summary,
            categoryId: categoryId || suggestedCategoryId,
            savedAt: Date.now()
        };

        const updatedUrls = [...(data.savedUrls || []), newUrl];
        await setStorageData({ savedUrls: updatedUrls });

        return newUrl;
    } catch (error) {
        if (error instanceof ErrorState) {
            throw error;
        }
        throw new ErrorState({
            message: 'Failed to save URL',
            code: ErrorCode.UNKNOWN_ERROR
        });
    }
}; 