import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft } from 'lucide-react';
import { useSavedUrls } from '../hooks/useSavedUrls';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { Category } from '../types/storage';
import { Button } from '../components/ui/Button';
import { FilterBar } from '../components/features/FilterBar';
import { SavedUrlsList } from '../components/features/SavedUrlsList';

const SavedUrls: React.FC = () => {
    const { savedUrls, loading, deleteUrl } = useSavedUrls();
    const [categories, setCategories] = useState<Category[]>([]);
    const {
        selectedCategory,
        setSelectedCategory,
        dateFilter,
        setDateFilter,
        filteredUrls
    } = useUrlFilters(savedUrls);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await chrome.storage.sync.get('categories');
            if (data.categories) {
                setCategories(data.categories);
            }
        };
        loadCategories();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteUrl(id);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.location.href = 'options.html'}
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <h1 className="text-2xl font-semibold">Saved URLs</h1>
            </div>

            <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                dateFilter={dateFilter}
                onCategoryChange={setSelectedCategory}
                onDateChange={setDateFilter}
            />

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