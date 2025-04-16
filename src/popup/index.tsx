import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Category, SavedUrl } from '@/types/storage';
import { Header } from '@/components/layout/Header';
import '@/styles.css';
import { SaveUrlForm } from '@/components/features/SaveUrlForm';
import { saveCurrentUrl } from '@/services/url';
import { setStorageData } from '@/services/chrome';
import { loadExtensionData } from '@/utils/loadData';

const Popup: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [savedUrls, setSavedUrls] = useState<SavedUrl[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { openaiApiKey, categories, savedUrls } = await loadExtensionData();
                if (!openaiApiKey) {
                    throw new Error('Please set your OpenAI API key in the options page');
                }
                setCategories(categories);
                setSavedUrls(savedUrls);
            } catch (err) {
                setError({ message: err instanceof Error ? err.message : 'Failed to load data' });
            }
        };
        loadData();
    }, []);

    const handleSave = async (categoryId: string) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const newUrl = await saveCurrentUrl(categoryId, categories);
            const updatedUrls = [...savedUrls, newUrl];

            // Update both storage and local state
            await setStorageData({ savedUrls: updatedUrls });
            setSavedUrls(updatedUrls);
            setSuccess(true);

            // Reset success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to save URL';
            setError({ message: errorMessage });
            if (errorMessage === 'This URL has already been saved') {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[400px] p-4">
            <Header
                onSettingsClick={() => chrome.runtime.openOptionsPage()}
                isOptionsPage={false}
                savedUrlsCount={savedUrls.length}
                onSavedUrlsClick={() => chrome.runtime.openOptionsPage()}
            />
            <p className="text-sm text-gray-600 mt-2">Do you find this url interesting and want to save it for later?</p>
            <div className="mt-4">
                <SaveUrlForm
                    categories={categories}
                    onSave={handleSave}
                    loading={loading}
                    error={error}
                    success={success}
                />
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />); 