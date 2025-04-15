import React, { useState } from 'react';
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import { Category } from '../../types/storage';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

interface CategoryManagerProps {
    categories: Category[];
    newCategory: Omit<Category, 'id'>;
    error?: string;
    onNewCategoryChange: (category: Omit<Category, 'id'>) => void;
    onAddCategory: () => void;
    onDeleteCategory: (id: string) => void;
    onUpdateCategory: (category: Category) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
    categories,
    newCategory,
    error,
    onNewCategoryChange,
    onAddCategory,
    onDeleteCategory,
    onUpdateCategory,
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setEditForm(category);
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

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Input
                            type="text"
                            value={newCategory.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                onNewCategoryChange({ ...newCategory, name: e.target.value })}
                            placeholder="Category name"
                        />
                        <Textarea
                            value={newCategory.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                onNewCategoryChange({ ...newCategory, description: e.target.value })}
                            placeholder="Category description"
                        />
                        <div className="flex gap-2">
                            <input
                                type="color"
                                className="w-10 h-10 p-1 rounded border"
                                value={newCategory.color}
                                onChange={(e) => onNewCategoryChange({ ...newCategory, color: e.target.value })}
                            />
                            <Button onClick={onAddCategory}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </Button>
                        </div>
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </div>

                <div className="space-y-2 mt-4">
                    {categories.map((category) => (
                        <div key={category.id} className="flex flex-col gap-2 p-3 bg-muted rounded">
                            {editingId === category.id ? (
                                <div className="space-y-2">
                                    <Input
                                        value={editForm?.name || ''}
                                        onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })}
                                    />
                                    <Textarea
                                        value={editForm?.description || ''}
                                        onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            className="w-6 h-6 rounded border"
                                            value={editForm?.color || ''}
                                            onChange={(e) => setEditForm({ ...editForm!, color: e.target.value })}
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
                                        <div className="font-medium">{category.name}</div>
                                        <div className="text-sm text-muted-foreground">{category.description}</div>
                                    </div>
                                    {!category.isDefault && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEdit(category)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    )}
                                    {!category.isDefault && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDeleteCategory(category.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}; 