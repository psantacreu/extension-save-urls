import React from 'react';
import { ErrorState, ErrorCode } from '../../types';
import { cn } from '../../utils/cn';

/**
 * Props for the ErrorMessage component
 */
interface ErrorMessageProps {
    /** The error to display */
    error: ErrorState | { message: string } | null;
    /** Additional CSS classes to apply */
    className?: string;
}

/**
 * A component for displaying error messages with different styles based on error type
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className }) => {
    if (!error) return null;

    const isCritical = error instanceof ErrorState &&
        [ErrorCode.API_KEY_MISSING, ErrorCode.API_ERROR].includes(error.code as ErrorCode);

    return (
        <div
            className={cn(
                'p-3 text-sm rounded-md flex items-start gap-2',
                isCritical
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200',
                className
            )}
        >
            <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>{error.message}</span>
        </div>
    );
}; 