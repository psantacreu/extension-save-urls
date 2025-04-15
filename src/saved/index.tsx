import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { Category, SavedUrl } from '../types/storage';
import { FilterBar } from '../components/features/FilterBar';
import { SavedUrlsList } from '../components/features/SavedUrlsList';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { Header } from '../components/layout/Header';
import { loadCategories } from '../services/category';
import { loadSavedUrls, deleteSavedUrl } from '../services/url';

const SavedUrls: React.FC = () => {
    const [savedUrls, setSavedUrls] = useState<SavedUrl[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ message: string } | null>(null);
    const {
        selectedCategory,
        setSelectedCategory,
        dateFilter,
        setDateFilter,
        filteredUrls
    } = useUrlFilters(savedUrls);

    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                const [loadedUrls, loadedCategories] = await Promise.all([
                    loadSavedUrls(),
                    loadCategories()
                ]);
                setSavedUrls(loadedUrls);
                setCategories(loadedCategories);
            } catch (err) {
                setError({ message: err instanceof Error ? err.message : 'Failed to load data' });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            setError(null);
            const updatedUrls = await deleteSavedUrl(id, savedUrls);
            setSavedUrls(updatedUrls);
        } catch (err) {
            setError({ message: err instanceof Error ? err.message : 'Failed to delete URL' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Header
                onSettingsClick={() => window.location.href = 'options.html'}
                isOptionsPage={false}
            />

            <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                dateFilter={dateFilter}
                onCategoryChange={setSelectedCategory}
                onDateChange={setDateFilter}
            />

            {error && <ErrorMessage error={error} />}

            <SavedUrlsList
                urls={filteredUrls}
                categories={categories}
                loading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<SavedUrls />); 