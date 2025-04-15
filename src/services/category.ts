import { Category } from '../types/storage';
import { getStorageData, setStorageData } from './chrome';

export const loadCategories = async (): Promise<Category[]> => {
    const data = await getStorageData();
    return data.categories || [];
};

export const addCategory = async (category: Omit<Category, 'id'>, existingCategories: Category[]): Promise<Category> => {
    const newCategory: Category = {
        ...category,
        id: Date.now().toString()
    };
    const updatedCategories = [...existingCategories, newCategory];
    await setStorageData({ categories: updatedCategories });
    return newCategory;
};

export const deleteCategory = async (id: string, existingCategories: Category[]): Promise<Category[]> => {
    const updatedCategories = existingCategories.filter(c => c.id !== id);
    await setStorageData({ categories: updatedCategories });
    return updatedCategories;
};

export const updateCategory = async (updatedCategory: Category, existingCategories: Category[]): Promise<Category[]> => {
    const updatedCategories = existingCategories.map(c =>
        c.id === updatedCategory.id ? updatedCategory : c
    );
    await setStorageData({ categories: updatedCategories });
    return updatedCategories;
}; 