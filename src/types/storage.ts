/**
 * Represents a category for organizing saved URLs
 */
export interface Category {
    id: string;
    name: string;
    description: string;
    color: string;
    isDefault?: boolean;
}

/**
 * Represents a saved URL with its metadata
 */
export interface SavedUrl {
    id: string;
    url: string;
    title: string;
    summary: string;
    categoryId: string;
    savedAt: number;
}

/**
 * Structure of data stored in Chrome's sync storage
 */
export interface StorageData {
    openaiApiKey?: string;
    categories?: Category[];
    savedUrls?: SavedUrl[];
}

/**
 * Default categories that are available when the extension is first installed
 */
export const DEFAULT_CATEGORIES: Readonly<Category[]> = [
    { 
        id: 'tutorials', 
        name: 'Tutorials', 
        description: 'Programming tutorials and learning resources',
        color: '#3B82F6',
        isDefault: true
    },
    { 
        id: 'documentation', 
        name: 'Documentation', 
        description: 'Technical documentation and API references',
        color: '#10B981',
        isDefault: true
    },
    { 
        id: 'tools', 
        name: 'Tools', 
        description: 'Development tools and utilities',
        color: '#8B5CF6',
        isDefault: true
    },
    { 
        id: 'inspiration', 
        name: 'Inspiration', 
        description: 'Design inspiration and creative resources',
        color: '#F59E0B',
        isDefault: true
    },
    { 
        id: 'articles', 
        name: 'Articles', 
        description: 'Interesting articles and blog posts',
        color: '#EF4444',
        isDefault: true
    }
] as const;

/**
 * Props for the UrlCard component
 */
export interface UrlCardProps {
    id: string;
    title: string;
    url: string;
    summary: string;
    categoryId: string;
    savedAt: number;
    categories: Category[];
    onDelete?: () => void;
    onCategoryChange?: (urlId: string, newCategoryId: string) => void;
} 