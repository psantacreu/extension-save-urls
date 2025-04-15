import { ErrorState, ErrorCode } from '../types';
import { Category } from '../types/storage';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export const summarizeUrl = async (url: string): Promise<string> => {
    // Get API key from Chrome storage
    const { openaiApiKey } = await chrome.storage.sync.get(['openaiApiKey']);
    
    if (!openaiApiKey) {
        throw new ErrorState({ message: 'OpenAI API key not found', code: ErrorCode.API_KEY_MISSING });
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
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
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new ErrorState({ 
                message: 'Failed to generate summary', 
                code: ErrorCode.API_ERROR 
            });
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        throw new ErrorState({ 
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            code: ErrorCode.REQUEST_FAILED
        });
    }
};

export const summarizeAndCategorize = async (
    content: string,
    categories: Category[],
    apiKey: string
): Promise<{ summary: string; categoryId: string }> => {
    const prompt = `Please analyze this content and:
1. Provide a concise summary (max 100 words)
2. Categorize it into one of these categories: ${categories.map(c => c.name).join(', ')}
3. Return the response in JSON format with "summary" and "categoryId" fields

Content: ${content}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to analyze content');
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    
    return {
        summary: result.summary,
        categoryId: categories.find(c => c.name.toLowerCase() === result.categoryId.toLowerCase())?.id || categories[0].id,
    };
}; 