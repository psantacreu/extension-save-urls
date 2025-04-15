/**
 * Represents a browser tab with its essential properties
 */
export interface Tab {
    id?: number;
    url?: string;
    title?: string;
}

/**
 * Represents a summary of a web page
 */
export interface Summary {
    content: string;
    timestamp: number;
}

/**
 * Error codes for different types of errors that can occur
 */
export enum ErrorCode {
    API_KEY_MISSING = 'API_KEY_MISSING',
    API_ERROR = 'API_ERROR',
    REQUEST_FAILED = 'REQUEST_FAILED',
    TAB_ERROR = 'TAB_ERROR',
    STORAGE_ERROR = 'STORAGE_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * Custom error class for handling application errors
 */
export class ErrorState extends Error {
    code?: ErrorCode;

    constructor({ message, code }: { message: string; code?: ErrorCode }) {
        super(message);
        this.code = code;
        this.name = 'ErrorState';
        Object.setPrototypeOf(this, ErrorState.prototype);
    }
}

/**
 * Represents the loading state of an operation
 */
export interface LoadingState {
    isLoading: boolean;
    message?: string;
}

/**
 * Represents a category with a unique identifier and a name
 */
export interface Category {
    id: string;
    name: string;
} 