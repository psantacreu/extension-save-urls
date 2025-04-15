import { ErrorState, ErrorCode } from '../types';

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
                model: 'gpt-4',
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