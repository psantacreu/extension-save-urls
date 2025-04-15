import React from 'react';
import { Settings } from 'lucide-react';
import { useCurrentTab } from '../hooks/useCurrentTab';
import { useSummary } from '../hooks/useSummary';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { openOptionsPage } from '../services/chrome';

export const Popup: React.FC = () => {
    const { tab, error: tabError } = useCurrentTab();
    const { summary, loading, error, generateSummary } = useSummary();

    const handleSummarize = () => {
        if (tab?.url) {
            generateSummary(tab.url);
        }
    };

    return (
        <div className="w-[400px] p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <h1 className="text-lg font-semibold">Link Summarizer</h1>
                <button
                    onClick={openOptionsPage}
                    title="Settings"
                    className="p-1 rounded hover:bg-gray-100"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            <div className="card p-4 bg-gray-50 rounded-md">
                {loading.isLoading ? (
                    <div className="flex justify-center items-center py-5">
                        <span className="text-gray-500">{loading.message}</span>
                    </div>
                ) : summary ? (
                    <p className="text-sm">{summary.content}</p>
                ) : (
                    <p className="text-sm text-gray-500">No summary available</p>
                )}
            </div>

            <ErrorMessage error={error} />
            {tabError && <ErrorMessage error={tabError} />}

            <Button
                onClick={handleSummarize}
                disabled={loading.isLoading || !tab?.url}
                isLoading={loading.isLoading}
            >
                Summarize Current Page
            </Button>
        </div>
    );
}; 