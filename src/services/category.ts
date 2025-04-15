import { Category } from '../types/storage';
import { getStorageData, setStorageData } from './chrome';
import { ErrorState, ErrorCode } from '../types';

export const loadCategories = async (): Promise<Category[]> => {
    try {
        const data = await getStorageData();
        return data.categories || [];
    } catch (error) {
        throw new ErrorState({
            message: 'Failed to load categories',
            code: ErrorCode.STORAGE_ERROR
        });
    }
};

export const addCategory = async (category: Omit<Category, 'id'>, existingCategories: Category[]): Promise<Category> => {
    try {
        const newCategory: Category = {
            ...category,
            id: Date.now().toString()
        };
        const updatedCategories = [...existingCategories, newCategory];
        await setStorageData({ categories: updatedCategories });
        return newCategory;
    } catch (error) {
        throw new ErrorState({
            message: 'Failed to add category',
            code: ErrorCode.STORAGE_ERROR
        });
    }
};

export const deleteCategory = async (id: string, existingCategories: Category[]): Promise<Category[]> => {
    try {
        const updatedCategories = existingCategories.filter(c => c.id !== id);
        await setStorageData({ categories: updatedCategories });
        return updatedCategories;
    } catch (error) {
        throw new ErrorState({
            message: 'Failed to delete category',
            code: ErrorCode.STORAGE_ERROR
        });
    }
};

export const updateCategory = async (updatedCategory: Category, existingCategories: Category[]): Promise<Category[]> => {
    try {
        const updatedCategories = existingCategories.map(c =>
            c.id === updatedCategory.id ? updatedCategory : c
        );
        await setStorageData({ categories: updatedCategories });
        return updatedCategories;
    } catch (error) {
        throw new ErrorState({
            message: 'Failed to update category',
            code: ErrorCode.STORAGE_ERROR
        });
    }
}; 