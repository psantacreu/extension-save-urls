import React from 'react';
import { Filter, Calendar } from 'lucide-react';
import { Category } from '@/types/storage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterBarProps {
    categories: Category[];
    selectedCategory: string;
    dateFilter: string;
    onCategoryChange: (value: string) => void;
    onDateChange: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    categories,
    selectedCategory,
    dateFilter,
    onCategoryChange,
    onDateChange,
}) => {
    return (
        <div className="flex gap-4 my-6">
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <Select value={dateFilter} onValueChange={onDateChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">Last 7 Days</SelectItem>
                        <SelectItem value="month">Last 30 Days</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}; 