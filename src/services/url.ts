import { SavedUrl } from '../types/storage';
import { getStorageData, setStorageData } from './chrome';
import { summarizeAndCategorize } from './openai';

export const loadSavedUrls = async (): Promise<SavedUrl[]> => {
    const data = await getStorageData();
    return data.savedUrls || [];
};

export const deleteSavedUrl = async (id: string, existingUrls: SavedUrl[]): Promise<SavedUrl[]> => {
    const updatedUrls = existingUrls.filter(url => url.id !== id);
    await setStorageData({ savedUrls: updatedUrls });
    return updatedUrls;
};

export const saveCurrentUrl = async (
    categoryId: string,
    categories: any[]
): Promise<SavedUrl> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url) {
        throw new Error('No URL found');
    }

    const data = await getStorageData();
    if (!data.openaiApiKey) {
        throw new Error('Please set your OpenAI API key in the options page');
    }

    const { summary, categoryId: suggestedCategoryId } = await summarizeAndCategorize(
        `${tab.title}\n${tab.url}`,
        categories,
        data.openaiApiKey
    );

    return {
        id: Date.now().toString(),
        url: tab.url,
        title: tab.title || 'Untitled',
        summary,
        categoryId: categoryId || suggestedCategoryId,
        savedAt: Date.now()
    };
}; 