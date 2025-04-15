import { useState, useEffect } from 'react';
import { Tab, ErrorState, ErrorCode } from '../types';
import { getCurrentTab } from '../services/chrome';

interface UseCurrentTabReturn {
    /** The current tab information */
    tab: Tab | null;
    /** The current error, if any */
    error: ErrorState | null;
}

/**
 * A hook for managing the current tab state
 * @returns An object containing the current tab information and any error
 */
export const useCurrentTab = (): UseCurrentTabReturn => {
    const [tab, setTab] = useState<Tab | null>(null);
    const [error, setError] = useState<ErrorState | null>(null);

    useEffect(() => {
        const fetchCurrentTab = async () => {
            try {
                const currentTab = await getCurrentTab();
                setTab(currentTab);
            } catch (err) {
                setError(err instanceof ErrorState ? err : new ErrorState({
                    message: 'Failed to get current tab',
                    code: ErrorCode.TAB_ERROR
                }));
            }
        };

        fetchCurrentTab();
    }, []);

    return { tab, error };
}; 