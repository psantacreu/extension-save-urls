import React from 'react';
import { SavedUrl } from '../../types/storage';
import { Category } from '../../types/storage';
import { UrlCard } from './UrlCard';
import { LoadingState } from '../common/LoadingState';

interface SavedUrlsListProps {
    urls: SavedUrl[];
    categories: Category[];
    loading: boolean;
    onDelete: (id: string) => void;
}

export const SavedUrlsList: React.FC<SavedUrlsListProps> = ({
    urls,
    categories,
    loading,
    onDelete,
}) => {
    if (loading) {
        return <LoadingState message="Loading saved URLs..." />;
    }

    if (urls.length === 0) {
        return <p className="text-center text-muted-foreground">No saved URLs found</p>;
    }

    return (
        <div className="grid gap-4">
            {urls.map(url => (
                <UrlCard
                    key={url.id}
                    title={url.title}
                    summary={url.summary}
                    categoryId={url.categoryId}
                    savedAt={url.savedAt}
                    categories={categories}
                    onDelete={() => onDelete(url.id)}
                />
            ))}
        </div>
    );
}; 