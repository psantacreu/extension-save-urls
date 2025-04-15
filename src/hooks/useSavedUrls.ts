import { useState, useEffect } from 'react';
import { SavedUrl } from '../types/storage';
import { getStorageData, setStorageData } from '../services/chrome';

export const useSavedUrls = () => {
    const [savedUrls, setSavedUrls] = useState<SavedUrl[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUrls = async () => {
            const data = await getStorageData();
            setSavedUrls(data.savedUrls || []);
            setLoading(false);
        };
        loadUrls();
    }, []);

    const saveUrl = async (url: SavedUrl) => {
        const newUrls = [...savedUrls, url];
        await setStorageData({ savedUrls: newUrls });
        setSavedUrls(newUrls);
    };

    const deleteUrl = async (id: string) => {
        const newUrls = savedUrls.filter(url => url.id !== id);
        await setStorageData({ savedUrls: newUrls });
        setSavedUrls(newUrls);
    };

    const updateUrlCategory = async (id: string, categoryId: string) => {
        const newUrls = savedUrls.map(url => 
            url.id === id ? { ...url, categoryId } : url
        );
        await setStorageData({ savedUrls: newUrls });
        setSavedUrls(newUrls);
    };

    return {
        savedUrls,
        loading,
        saveUrl,
        deleteUrl,
        updateUrlCategory,
    };
}; 