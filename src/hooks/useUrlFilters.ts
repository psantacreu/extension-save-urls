import { useState, useMemo } from 'react';
import { SavedUrl } from '@/types/storage';
import { isWithinDateRange } from '@/utils/filters';

export const useUrlFilters = (urls: SavedUrl[]) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<string>('all');

    const filteredUrls = useMemo(() => {
        return urls.filter(url => {
            const categoryMatch = selectedCategory === 'all' || url.categoryId === selectedCategory;
            const dateMatch = dateFilter === 'all' || isWithinDateRange(url.savedAt, dateFilter);
            return categoryMatch && dateMatch;
        });
    }, [urls, selectedCategory, dateFilter]);

    return {
        selectedCategory,
        setSelectedCategory,
        dateFilter,
        setDateFilter,
        filteredUrls
    };
}; 