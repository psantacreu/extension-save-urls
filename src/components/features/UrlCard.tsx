import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { Category } from '../../types/storage';
import { Button } from '../ui/Button';
import { formatSavedDate } from '../../utils/date';

interface UrlCardProps {
    title: string;
    url: string;
    summary: string;
    categoryId: string;
    savedAt: number;
    categories: Category[];
    onDelete?: () => void;
}

export const UrlCard: React.FC<UrlCardProps> = ({
    title,
    url,
    summary,
    categoryId,
    savedAt,
    categories,
    onDelete,
}) => {
    const category = categories.find(c => c.id === categoryId);

    return (
        <div className="card p-4 bg-card border rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium">{title}</h3>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-1"
                    >
                        {url} <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
                {onDelete && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onDelete}
                        className="text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">{summary}</p>
            <div className="flex items-center gap-2 mt-2">
                <div
                    className="w-3 h-3 rounded-full"
                    style={{
                        backgroundColor: category?.color || '#000',
                    }}
                />
                <span className="text-xs text-muted-foreground">
                    {category?.name || 'Uncategorized'} • Saved {formatSavedDate(savedAt)}
                </span>
            </div>
        </div>
    );
}; 