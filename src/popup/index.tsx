import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getStorageData } from '../services/chrome';
import { Category, SavedUrl } from '../types/storage';
import { Header } from '../components/layout/Header';
import '../styles.css';
import { SaveUrlForm } from '../components/features/SaveUrlForm';
import { saveCurrentUrl } from '../services/url';
import { setStorageData } from '../services/chrome';

const Popup: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [savedUrls, setSavedUrls] = useState<SavedUrl[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await getStorageData();
            if (!data.openaiApiKey) {
                throw new Error('Please set your OpenAI API key in the options page');
            }
            if (data.categories) setCategories(data.categories);
            if (data.savedUrls) setSavedUrls(data.savedUrls);
        };
        loadData();
    }, []);

    const handleSave = async (categoryId: string) => {
        try {
            setLoading(true);
            setError(null);

            const newUrl = await saveCurrentUrl(categoryId, categories);
            const updatedUrls = [...savedUrls, newUrl];
            await setStorageData({ savedUrls: updatedUrls });
            setSavedUrls(updatedUrls);
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
                title="Save URL"
                onSettingsClick={() => chrome.runtime.openOptionsPage()}
                showSavedButton={true}
                savedUrlsCount={savedUrls.length}
            />
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