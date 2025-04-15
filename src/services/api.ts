import { SavedUrl } from '../types/storage';

export const saveUrl = async (
    url: string,
    title: string,
    categoryId: string,
    apiKey: string
): Promise<void> => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that summarizes web content.'
                },
                {
                    role: 'user',
                    content: `Please provide a concise summary of this webpage:\n\nTitle: ${title}\nURL: ${url}`
                }
            ],
            temperature: 0.7,
            max_tokens: 150
        })
    });

    if (!response.ok) {
        throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    const summary = data.choices[0].message.content;

    const newUrl: SavedUrl = {
        id: Date.now().toString(),
        url,
        title,
        summary,
        categoryId,
        savedAt: Date.now()
    };

    const savedUrls = await chrome.storage.sync.get('savedUrls');
    const updatedUrls = [...(savedUrls.savedUrls || []), newUrl];
    await chrome.storage.sync.set({ savedUrls: updatedUrls });
}; 