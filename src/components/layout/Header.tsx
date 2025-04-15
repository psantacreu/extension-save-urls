import React from 'react';
import { Settings, Bookmark } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
    title: string;
    onSettingsClick: () => void;
    showSavedButton?: boolean;
    savedUrlsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    onSettingsClick,
    showSavedButton = false,
    savedUrlsCount = 0,
}) => {
    const handleSavedClick = () => {
        window.open(chrome.runtime.getURL('saved.html'), '_blank');
    };

    return (
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="flex items-center gap-2">
                {showSavedButton && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSavedClick}
                        className="relative"
                    >
                        <Bookmark className="w-4 h-4" />
                        {savedUrlsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {savedUrlsCount}
                            </span>
                        )}
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onSettingsClick}
                >
                    <Settings className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}; 