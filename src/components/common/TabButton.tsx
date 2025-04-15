import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TabButtonProps {
    icon: LucideIcon;
    label: string;
    count?: number;
    isActive: boolean;
    onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
    icon: Icon,
    label,
    count,
    isActive,
    onClick,
}) => (
    <button
        className={`btn flex-1 ${isActive ? 'btn-primary' : ''}`}
        onClick={onClick}
    >
        <Icon className="w-4 h-4" />
        {label}
        {count !== undefined && ` (${count})`}
    </button>
); 