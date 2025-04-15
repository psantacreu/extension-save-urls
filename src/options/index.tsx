import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Category } from '../types/storage';
import { Header } from '../components/layout/Header';
import { ApiConfigForm } from '../components/features/ApiConfigForm';
import { CategoryManager } from '../components/features/CategoryManager';
import { getStorageData } from '../services/chrome';
import { saveApiKey } from '../services/api';
import { addCategory, deleteCategory, updateCategory } from '../services/category';

const Options: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
        name: '',
        description: '',
        color: '#000000'
    });

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
            await saveApiKey(newApiKey);
        } catch (err) {
            setError({ message: err instanceof Error ? err.message : 'Failed to save API key' });
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        try {
            setError(null);
            const newCategoryWithId = await addCategory(newCategory, categories);
            setCategories(prev => [...prev, newCategoryWithId]);
            setNewCategory({ name: '', description: '', color: '#000000' });
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
                        newCategory={newCategory}
                        onNewCategoryChange={setNewCategory}
                        onAddCategory={handleAddCategory}
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