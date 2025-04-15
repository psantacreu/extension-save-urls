import { useState, useMemo } from 'react';
import { SavedUrl } from '../types/storage';

export const useUrlFilters = (urls: SavedUrl[]) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<string>('all');

    const isWithinDateRange = (timestamp: number, range: string) => {
        const now = Date.now();
        const diffInDays = Math.floor((now - timestamp) / (1000 * 60 * 60 * 24));

        switch (range) {
            case 'today':
                return diffInDays === 0;
            case 'week':
                return diffInDays <= 7;
            case 'month':
                return diffInDays <= 30;
            default:
                return true;
        }
    };

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