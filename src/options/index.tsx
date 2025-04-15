import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Key, Save } from 'lucide-react';

const Options: React.FC = () => {
    const [apiKey, setApiKey] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    useEffect(() => {
        // Load saved API key
        chrome.storage.sync.get(['openaiApiKey'], (result) => {
            if (result.openaiApiKey) {
                setApiKey(result.openaiApiKey);
            }
        });
    }, []);

    const handleSave = () => {
        if (!apiKey) {
            setError('API key is required');
            return;
        }

        chrome.storage.sync.set({ openaiApiKey: apiKey }, () => {
            console.log('API key saved:', apiKey);
            setSuccess('Settings saved successfully');
            setError('');
            setTimeout(() => setSuccess(''), 3000);
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Linkbook Settings</h1>
            </div>

            <div className="card">
                <h2 className="text-lg font-medium mb-4">API Configuration</h2>
                <div className="mb-4">
                    <label htmlFor="apiKey" className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        OpenAI API Key
                    </label>
                    <input
                        id="apiKey"
                        type="password"
                        className="input"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your OpenAI API key"
                    />
                    {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                    {success && (
                        <p className="mt-2 text-sm text-green-600">{success}</p>
                    )}
                </div>
                <button
                    className="btn btn-primary flex items-center gap-2"
                    onClick={handleSave}
                >
                    <Save className="w-4 h-4" />
                    Save Settings
                </button>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Options />); 