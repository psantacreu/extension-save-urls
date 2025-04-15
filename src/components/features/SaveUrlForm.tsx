import React, { useState } from 'react';
import { Category } from '../../types/storage';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ErrorMessage } from '../common/ErrorMessage';
import { CheckCircle2 } from 'lucide-react';

interface SaveUrlFormProps {
    categories: Category[];
    onSave: (categoryId: string) => Promise<void>;
    loading: boolean;
    error: { message: string } | null;
    success?: boolean;
}

export const SaveUrlForm: React.FC<SaveUrlFormProps> = ({
    categories,
    onSave,
    loading,
    error,
    success,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [localSuccess, setLocalSuccess] = useState(false);

    const handleSave = async () => {
        await onSave(selectedCategory);
        setLocalSuccess(true);
        setSelectedCategory('');
        setTimeout(() => setLocalSuccess(false), 3000);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {error && <ErrorMessage error={error} />}
                {(success || localSuccess) && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        URL saved successfully!
                    </div>
                )}
            </div>
            <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full"
            >
                {loading ? 'Saving...' : 'Save URL'}
            </Button>
        </div>
    );
}; 