import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useSavedUrls } from '../hooks/useSavedUrls';
import { getStorageData } from '../services/chrome';
import { Category, SavedUrl } from '../types/storage';
import { Header } from '../components/layout/Header';
import { summarizeAndCategorize } from '../services/openai';
import '../styles.css';
import { SaveUrlForm } from '../components/features/SaveUrlForm';

const Popup: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [savedUrls, setSavedUrls] = useState<SavedUrl[]>([]);
    const { saveUrl } = useSavedUrls();

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

            const newUrl: SavedUrl = {
                id: Date.now().toString(),
                url: tab.url,
                title: tab.title || 'Untitled',
                summary,
                categoryId: categoryId || suggestedCategoryId,
                savedAt: Date.now()
            };
            await saveUrl(newUrl);
            setSavedUrls(prev => [...prev, newUrl]);
        } catch (err) {
            setError({ message: err instanceof Error ? err.message : 'Failed to save URL' });
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
                />
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />); 