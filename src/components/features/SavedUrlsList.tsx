import React from 'react';
import { SavedUrl } from '../../types/storage';
import { Category } from '../../types/storage';
import UrlCard from './UrlCard';
import { LoadingState } from '../common/LoadingState';

interface SavedUrlsListProps {
    urls: SavedUrl[];
    categories: Category[];
    loading: boolean;
    onDelete: (id: string) => void;
    onCategoryChange?: (urlId: string, newCategoryId: string) => void;
}

export const SavedUrlsList: React.FC<SavedUrlsListProps> = ({
    urls,
    categories,
    loading,
    onDelete,
    onCategoryChange,
}) => {
    if (loading) {
        return <LoadingState message="Loading saved URLs..." />;
    }

    if (urls.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                    >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">No saved URLs yet</h3>
                <p className="text-muted-foreground max-w-md">
                    Start saving URLs by clicking the extension icon in your browser's toolbar.
                    Your saved links will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {urls.map(url => (
                <UrlCard
                    key={url.id}
                    id={url.id}
                    title={url.title}
                    url={url.url}
                    summary={url.summary}
                    categoryId={url.categoryId}
                    savedAt={url.savedAt}
                    categories={categories}
                    onDelete={() => onDelete(url.id)}
                    onCategoryChange={onCategoryChange}
                />
            ))}
        </div>
    );
}; 