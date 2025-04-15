import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, } from 'lucide-react';

interface CategoryFormProps {
    onAddCategory: (category: { name: string; description: string; color: string }) => void;
    error?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    onAddCategory,
    error,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        color: '#000000',
    });

    const handleAddCategory = () => {
        onAddCategory(newCategory);
        setNewCategory({ name: '', description: '', color: '#000000' });
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    Add a new category to organize your saved URLs
                </span>
                <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                >
                    <Plus className="w-3 h-3 mr-2" />
                    Add Category
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <Input
                    type="text"
                    value={newCategory.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Category name"
                />
                <Textarea
                    value={newCategory.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Category description"
                />
                <div className="flex gap-2">
                    <input
                        type="color"
                        className="w-10 h-10 p-1 rounded border"
                        value={newCategory.color}
                        onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    />
                    <div className="flex gap-2">
                        <Button onClick={handleAddCategory} disabled={!newCategory.name}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
            {error && (
                <div className="text-sm text-destructive">
                    {error}
                </div>
            )}
        </div>
    );
}; 