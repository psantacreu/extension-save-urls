import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Category, SavedUrl } from '@/types/storage';
import { Header } from '@/components/layout/Header';
import { ApiConfigForm } from '@/components/features/ApiConfigForm';
import { CategoryManager } from '@/components/features/CategoryManager';
import { saveApiKey } from '@/services/openai';
import { addCategory, deleteCategory, updateCategory } from '@/services/category';
import { loadExtensionData } from '@/utils/loadData';

const Options: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [savedUrls, setSavedUrls] = useState<SavedUrl[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const { openaiApiKey, categories, savedUrls } = await loadExtensionData();
            if (openaiApiKey) setApiKey(openaiApiKey);
            setCategories(categories);
            setSavedUrls(savedUrls);
        };
        loadData();
    }, []);

    const handleSaveApiKey = async (newApiKey: string) => {
        try {
            setLoading(true);
            setError(null);
            await saveApiKey(newApiKey);
        } catch (err) {
            setError({ message: err instanceof Error ? err.message : 'Failed to save API key' });
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (category: Omit<Category, 'id'>) => {
        try {
            setError(null);
            const newCategoryWithId = await addCategory(category, categories);
            setCategories(prev => [...prev, newCategoryWithId]);
        } catch (err) {
            setError({ message: err instanceof Error ? err.message : 'Failed to add category' });
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            setError(null);
            const updatedCategories = await deleteCategory(id, categories);
            setCategories(updatedCategories);
        } catch (err) {
            setError({ message: err instanceof Error ? err.message : 'Failed to delete category' });
        }
    };

    const handleUpdateCategory = async (updatedCategory: Category) => {
        try {
            setError(null);
            const updatedCategories = await updateCategory(updatedCategory, categories);
            setCategories(updatedCategories);
        } catch (err) {
            setError({ message: err instanceof Error ? err.message : 'Failed to update category' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Header
                onSettingsClick={() => window.location.href = 'saved.html'}
                savedUrlsCount={savedUrls.length}
                isOptionsPage={true}
            />
            <h1 className="text-2xl font-semibold mt-4">Settings</h1>
            <div className="space-y-8 mt-6">
                <div>
                    <h2 className="text-lg font-semibold mb-4">API Configuration</h2>
                    <ApiConfigForm
                        initialApiKey={apiKey}
                        onSave={handleSaveApiKey}
                        loading={loading}
                        error={error}
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">Categories</h2>
                    <CategoryManager
                        categories={categories}
                        onAddCategory={handleAddCategory}
                        onDeleteCategory={handleDeleteCategory}
                        onUpdateCategory={handleUpdateCategory}
                        error={error?.message}
                    />
                </div>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Options />); 