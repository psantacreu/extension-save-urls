export interface Category {
    id: string;
    name: string;
    description: string;
    color: string;
    isDefault?: boolean;
}

export interface SavedUrl {
    id: string;
    url: string;
    title: string;
    summary: string;
    categoryId: string;
    savedAt: number;
}

export interface StorageData {
    openaiApiKey?: string;
    categories?: Category[];
    savedUrls?: SavedUrl[];
}

export const DEFAULT_CATEGORIES: Category[] = [
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
]; 