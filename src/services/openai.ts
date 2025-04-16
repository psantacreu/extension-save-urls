import { ErrorState, ErrorCode } from '@/types';
import { Category } from '@/types/storage';
import { 
    OpenAIResponse, 
    CategorizationResult, 
    DEFAULT_OPENAI_CONFIG 
} from '@/types/openai';
import { ScrapedContent } from '@/types/scraper';

/**
 * Creates headers for OpenAI API requests
 * @param apiKey - OpenAI API key
 * @returns Headers object
 */
const createHeaders = (apiKey: string) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
});

/**
 * Handles API errors and converts them to ErrorState
 * @param error - The error to handle
 * @throws ErrorState
 */
const handleApiError = (error: unknown): never => {
    if (error instanceof ErrorState) {
        throw error;
    }
    if (error instanceof Error) {
        throw new ErrorState({ 
            message: error.message,
            code: ErrorCode.API_ERROR
        });
    }
    throw new ErrorState({ 
        message: 'Unknown error occurred',
        code: ErrorCode.API_ERROR
    });
};

/**
 * Summarizes a URL using OpenAI API
 * @param url - The URL to summarize
 * @returns Promise with the summary
 * @throws ErrorState if API key is missing or request fails
 */
export const summarizeUrl = async (url: string): Promise<string> => {
    const { openaiApiKey } = await chrome.storage.sync.get(['openaiApiKey']);
    
    if (!openaiApiKey) {
        throw new ErrorState({ 
            message: 'OpenAI API key not found', 
            code: ErrorCode.API_KEY_MISSING 
        });
    }

    try {
        const response = await fetch(DEFAULT_OPENAI_CONFIG.apiUrl, {
            method: 'POST',
            headers: createHeaders(openaiApiKey),
            body: JSON.stringify({
                model: DEFAULT_OPENAI_CONFIG.defaultModel,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that summarizes web pages. Provide a concise summary of the main points.'
                    },
                    {
                        role: 'user',
                        content: `Please summarize this URL: ${url}`
                    }
                ],
                max_tokens: DEFAULT_OPENAI_CONFIG.maxTokens
            })
        });

        if (!response.ok) {
            throw new ErrorState({ 
                message: 'Failed to generate summary', 
                code: ErrorCode.API_ERROR 
            });
        }

        const data = await response.json() as OpenAIResponse;
        return data.choices[0].message.content;
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Summarizes content and categorizes it into one of the provided categories
 * @param scrapedContent - The scraped content to analyze
 * @param categories - Available categories
 * @param apiKey - OpenAI API key
 * @returns Promise with summary and category ID
 * @throws ErrorState if request fails
 */
export const summarizeAndCategorize = async (
    scrapedContent: ScrapedContent,
    categories: Category[],
    apiKey: string
): Promise<CategorizationResult> => {
    if (!apiKey) {
        throw new ErrorState({
            message: 'OpenAI API key is required',
            code: ErrorCode.API_KEY_MISSING
        });
    }

    // Create a prompt that includes both text and image information
    const prompt = `Please analyze this content and:
1. Provide a summary that contains the core information of the content (max 100 words)
2. Categorize it into one of these categories: ${categories.map(c => c.name).join(', ')}

Content: ${scrapedContent.text}
${scrapedContent.images.length > 0 ? `\nImages found on the page: ${scrapedContent.images.join(', ')}` : ''}

## Rules
- Never let the summary start with "The content describes...", "Content/page is about..." or similar phrases.
- The summary should be concise and to the point with the core points of the page.
- The summary should be in English.
- The category name should be exactly as listed above.
- Return ONLY a valid JSON object with this exact structure:
{
    "summary": "your summary here",
    "categoryId": "category name"
}
`;

    try {
        const response = await fetch(DEFAULT_OPENAI_CONFIG.apiUrl, {
            method: 'POST',
            headers: createHeaders(apiKey),
            body: JSON.stringify({
                model: DEFAULT_OPENAI_CONFIG.defaultModel,
                messages: [{ role: 'user', content: prompt }],
                temperature: DEFAULT_OPENAI_CONFIG.temperature,
                response_format: { type: "json_object" }
            }),
        });

        if (!response.ok) {
            throw new ErrorState({ 
                message: 'Failed to analyze content',
                code: ErrorCode.API_ERROR
            });
        }

        const data = await response.json() as OpenAIResponse;
        let result: CategorizationResult;
        
        try {
            result = JSON.parse(data.choices[0].message.content) as CategorizationResult;
        } catch (parseError) {
            throw new ErrorState({
                message: 'Invalid response format from AI',
                code: ErrorCode.API_ERROR
            });
        }
        
        const matchedCategory = categories.find(
            c => c.name.toLowerCase() === result.categoryId.toLowerCase()
        );
        
        if (!matchedCategory) {
            throw new ErrorState({
                message: 'Failed to match category',
                code: ErrorCode.API_ERROR
            });
        }
        
        return {
            summary: result.summary,
            categoryId: matchedCategory.id,
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export const saveApiKey = async (apiKey: string): Promise<void> => {
    if (!apiKey) {
        throw new ErrorState({ 
            message: 'API key cannot be empty',
            code: ErrorCode.API_KEY_MISSING
        });
    }
    await chrome.storage.sync.set({ openaiApiKey: apiKey });
}; 