import React from 'react';
import { Settings, Bookmark, Link, Book } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/badge';

interface HeaderProps {
    onSettingsClick: () => void;
    isOptionsPage?: boolean;
    savedUrlsCount?: number;
    onSavedUrlsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    onSettingsClick,
    isOptionsPage = false,
    savedUrlsCount,
}) => {
    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
                <Book className="w-5 h-5 mr-2" />
                <h1 className="text-xl font-semibold">Linkbook</h1>
            </div>
            <div className="flex items-center gap-2">
                <Badge>
                    Saved {savedUrlsCount ?? 0} {savedUrlsCount && savedUrlsCount > 1 ? 'URLs' : 'URL'}
                </Badge>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onSettingsClick}
                >
                    {isOptionsPage ? (
                        <Bookmark className="w-4 h-4" />
                    ) : (
                        <Settings className="w-4 h-4" />
                    )}
                </Button>
            </div>
        </header >
    );
}; 