import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { ErrorMessage } from '../common/ErrorMessage';

interface ApiConfigFormProps {
    initialApiKey: string;
    onSave: (apiKey: string) => Promise<void>;
    loading: boolean;
    error: { message: string } | null;
}

export const ApiConfigForm: React.FC<ApiConfigFormProps> = ({
    initialApiKey,
    onSave,
    loading,
    error,
}) => {
    const [apiKey, setApiKey] = useState(initialApiKey);

    const handleSave = async () => {
        await onSave(apiKey);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenAI API key"
                />
                {error && <ErrorMessage error={error} />}
            </div>
            <Button
                onClick={handleSave}
                disabled={!apiKey || loading}
                className="w-full"
            >
                {loading ? 'Saving...' : 'Save API Key'}
            </Button>
        </div>
    );
}; 