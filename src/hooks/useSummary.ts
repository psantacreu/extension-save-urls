import { useState, useCallback } from 'react';
import { Summary, LoadingState, ErrorState, ErrorCode } from '../types';
import { summarizeUrl } from '../services/openai';

interface UseSummaryReturn {
    /** The current summary, if any */
    summary: Summary | null;
    /** The current loading state */
    loading: LoadingState;
    /** The current error, if any */
    error: ErrorState | null;
    /** Function to generate a new summary */
    generateSummary: (url: string) => Promise<void>;
}

/**
 * A hook for managing summary generation state and operations
 * @returns An object containing the summary state and generation function
 */
export const useSummary = (): UseSummaryReturn => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState<LoadingState>({ isLoading: false });
    const [error, setError] = useState<ErrorState | null>(null);

    const generateSummary = useCallback(async (url: string) => {
        if (!url) {
            setError(new ErrorState({
                message: 'URL is required',
                code: ErrorCode.UNKNOWN_ERROR
            }));
            return;
        }

        setLoading({ isLoading: true, message: 'Generating summary...' });
        setError(null);

        try {
            const content = await summarizeUrl(url);
            setSummary({
                content,
                timestamp: Date.now()
            });
        } catch (err) {
            setError(err instanceof ErrorState ? err : new ErrorState({ 
                message: 'Failed to generate summary',
                code: ErrorCode.UNKNOWN_ERROR
            }));
        } finally {
            setLoading({ isLoading: false });
        }
    }, []);

    return {
        summary,
        loading,
        error,
        generateSummary
    };
}; 