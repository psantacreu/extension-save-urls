import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Key, CheckCircle2, AlertCircle, ExternalLink, Save, XCircle } from 'lucide-react';

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
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        await onSave(apiKey);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Configure your OpenAI API key to enable AI-powered features. Your API key is stored securely and only used for your requests.
                    </p>
                    <p className="text-sm text-gray-600 flex gap-1">
                        You can get an API key from {' '}
                        <a href="https://platform.openai.com/api-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold hover:underline flex gap-1 items-center"
                        >
                            OpenAI platform <ExternalLink className="w-3 h-3" />
                        </a>
                    </p>
                </div>
                <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                >
                    <Key className="w-3 h-3 mr-2" />
                    {initialApiKey ? "Edit API Key" : "Configure API Key"}
                </Button>
                <span className={`text-sm flex items-center gap-1 ${initialApiKey ? "text-success" : "text-error"}`}>
                    {initialApiKey ? (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            API key is configured
                        </>
                    ) : (
                        <>
                            <AlertCircle className="w-4 h-4" />
                            No API key configured
                        </>
                    )}
                </span>
            </div>
        );
    }

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
            <div className="flex gap-2 justify-start">
                <Button
                    onClick={handleSave}
                    disabled={!apiKey || loading}
                    size="sm"
                >
                    {loading ? 'Saving...' : <><Save className="w-3 h-3 mr-1" />Save API Key</>}
                </Button>
                <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    size="sm"
                >
                    <><XCircle className="text-destructive w-3 h-3 mr-1" /> Cancel</>
                </Button>
            </div>
        </div>
    );
}; 