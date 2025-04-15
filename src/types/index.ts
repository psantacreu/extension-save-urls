/**
 * Represents a browser tab with its essential properties
 */
export interface Tab {
    /** The unique identifier of the tab */
    id?: number;
    /** The URL of the tab */
    url?: string;
    /** The title of the tab */
    title?: string;
}

/**
 * Represents a summary of a web page
 */
export interface Summary {
    /** The content of the summary */
    content: string;
    /** The timestamp when the summary was generated */
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
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * Custom error class for handling application errors
 */
export class ErrorState extends Error {
    /** The error code associated with the error */
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
    /** Whether the operation is in progress */
    isLoading: boolean;
    /** Optional message to display during loading */
    message?: string;
}

/**
 * Represents a category with a unique identifier and a name
 */
export interface Category {
    /** The unique identifier of the category */
    id: string;
    /** The name of the category */
    name: string;
} 