import React, { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { Category } from '@/types/storage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryForm } from './CategoryForm';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CategoryManagerProps {
    categories: Category[];
    error?: string;
    onAddCategory: (category: Omit<Category, 'id'>) => void;
    onDeleteCategory: (id: string) => void;
    onUpdateCategory: (category: Category) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
    categories,
    error,
    onAddCategory,
    onDeleteCategory,
    onUpdateCategory,
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setEditForm({ ...category });
    };

    const handleSaveEdit = () => {
        if (editForm) {
            onUpdateCategory(editForm);
            setEditingId(null);
            setEditForm(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm(null);
    };

    const handleEditFormChange = (field: keyof Category, value: string) => {
        if (editForm) {
            setEditForm({ ...editForm, [field]: value });
        }
    };

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
    };

    const handleDeleteConfirm = () => {
        if (categoryToDelete) {
            onDeleteCategory(categoryToDelete.id);
            setCategoryToDelete(null);
        }
    };

    return (
        <>
            <Card className="mb-6 pt-6">
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.id} className="flex flex-col gap-2 p-3 bg-muted rounded">
                                    {editingId === category.id ? (
                                        <div className="space-y-2">
                                            <Input
                                                value={editForm?.name || ''}
                                                onChange={(e) => handleEditFormChange('name', e.target.value)}
                                            />
                                            <Textarea
                                                value={editForm?.description || ''}
                                                onChange={(e) => handleEditFormChange('description', e.target.value)}
                                            />
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    className="w-6 h-6 rounded border"
                                                    value={editForm?.color || ''}
                                                    onChange={(e) => handleEditFormChange('color', e.target.value)}
                                                />
                                                <Button variant="ghost" size="icon" onClick={handleSaveEdit}>
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: category.color }}
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">
                                                    {category.name}
                                                    {category.isDefault && (
                                                        <span className="ml-2 text-xs text-muted-foreground">
                                                            (Default)
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-muted-foreground">{category.description}</div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(category)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteClick(category)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4">
                            <CategoryForm
                                onAddCategory={onAddCategory}
                                error={error}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                            {categoryToDelete?.isDefault ? (
                                <>
                                    This is a default category. Are you sure you want to delete it?
                                    <br />
                                    <span className="text-destructive font-medium">
                                        Note: This action cannot be undone.
                                    </span>
                                </>
                            ) : (
                                "Are you sure you want to delete this category? This action cannot be undone."
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}; 