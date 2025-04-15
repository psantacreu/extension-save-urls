import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Category } from '../types/storage';
import { Header } from '../components/layout/Header';
import { ApiConfigForm } from '../components/features/ApiConfigForm';
import { CategoryManager } from '../components/features/CategoryManager';
import { getStorageData, setStorageData } from '../services/chrome';

const Options: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const data = await getStorageData();
            if (data.openaiApiKey) setApiKey(data.openaiApiKey);
            if (data.categories) setCategories(data.categories);
        };
        loadData();
    }, []);

    const handleSaveApiKey = async (newApiKey: string) => {
        try {
            setLoading(true);
            setError(null);
            await setStorageData({ openaiApiKey: newApiKey });
        } catch (err) {
            setError({ message: err instanceof Error ? err.message : 'Failed to save API key' });
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = (category: Omit<Category, 'id'>) => {
        const newCategory: Category = {
            ...category,
            id: Date.now().toString()
        };
        setCategories([...categories, newCategory]);
        setStorageData({ categories: [...categories, newCategory] });
    };

    const handleDeleteCategory = (id: string) => {
        const updatedCategories = categories.filter(c => c.id !== id);
        setCategories(updatedCategories);
        setStorageData({ categories: updatedCategories });
    };

    const handleUpdateCategory = (updatedCategory: Category) => {
        const updatedCategories = categories.map(c =>
            c.id === updatedCategory.id ? updatedCategory : c
        );
        setCategories(updatedCategories);
        setStorageData({ categories: updatedCategories });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Header
                title="Settings"
                onSettingsClick={() => window.location.href = 'saved.html'}
            />

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
                        newCategory={{ name: '', description: '', color: '#000000' }}
                        onNewCategoryChange={() => { }}
                        onAddCategory={() => handleAddCategory({ name: '', description: '', color: '#000000' })}
                        onDeleteCategory={handleDeleteCategory}
                        onUpdateCategory={handleUpdateCategory}
                    />
                </div>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Options />); 