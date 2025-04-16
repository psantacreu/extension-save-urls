import React from 'react';
import { Trash2, ExternalLink, ChevronDown } from 'lucide-react';
import { UrlCardProps } from '@/types/storage';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { formatSavedDate } from '@/utils/date';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Component that displays a saved URL with its metadata
 * @param props - Component props
 * @returns A card displaying URL information
 */
const UrlCard: React.FC<UrlCardProps> = ({
    id,
    title,
    url,
    summary,
    categoryId,
    savedAt,
    categories,
    onDelete,
    onCategoryChange,
}) => {
    const category = categories.find(c => c.id === categoryId);
    const formattedDate = formatSavedDate(savedAt);

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        onDelete?.();
    };

    const handleCategoryChange = (newCategoryId: string) => {
        onCategoryChange?.(id, newCategoryId);
    };

    return (
        <div className="card p-4 bg-card border rounded-lg">
            <div className="flex justify-between items-start">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary font-semibold hover:underline flex items-center gap-1 mt-1"
                >
                    <h3 className="font-medium">{title}</h3>
                    <ExternalLink className="w-3 h-3" />
                </a>
                {onDelete && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Delete URL"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <p className="text-sm text-muted-foreground">{summary}</p>
            <div className="flex items-center gap-2 mt-2">
                {onCategoryChange ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1.5 h-6 px-2"
                                style={{
                                    borderColor: category?.color || '#000',
                                    color: category?.color || '#000',
                                }}
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                        backgroundColor: category?.color || '#000',
                                    }}
                                />
                                {category?.name || 'Uncategorized'}
                                <ChevronDown className="w-3 h-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {categories.map((cat) => (
                                <DropdownMenuItem
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: cat.color }}
                                    />
                                    {cat.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Badge
                        variant="outline"
                        className="flex items-center gap-1.5"
                        style={{
                            borderColor: category?.color || '#000',
                            color: category?.color || '#000',
                        }}
                    >
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: category?.color || '#000',
                            }}
                        />
                        {category?.name || 'Uncategorized'}
                    </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                    •  Saved {formattedDate}
                </span>
            </div>
        </div>
    );
};

export default UrlCard; 