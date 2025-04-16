import { Category, SavedUrl } from '@/types/storage';
import { getStorageData } from '@/services/chrome';

export interface LoadedData {
    openaiApiKey?: string;
    categories: Category[];
    savedUrls: SavedUrl[];
}

export const loadExtensionData = async (): Promise<LoadedData> => {
    const data = await getStorageData();
    return {
        openaiApiKey: data.openaiApiKey,
        categories: data.categories || [],
        savedUrls: data.savedUrls || []
    };
}; 