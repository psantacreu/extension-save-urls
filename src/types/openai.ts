/**
 * Response structure from OpenAI API
 */
export interface OpenAIResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

/**
 * Result of content categorization
 */
export interface CategorizationResult {
    summary: string;
    categoryId: string;
}

/**
 * Configuration for OpenAI API requests
 */
export interface OpenAIConfig {
    apiUrl: string;
    defaultModel: string;
    maxTokens: number;
    temperature: number;
}

/**
 * Default configuration for OpenAI API
 */
export const DEFAULT_OPENAI_CONFIG: Readonly<OpenAIConfig> = {
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    defaultModel: 'gpt-4o',
    maxTokens: 1000,
    temperature: 0.7,
} as const;