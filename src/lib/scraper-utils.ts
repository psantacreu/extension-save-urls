export const MAX_IMAGES = 5;
export const MAX_RETRIES = 3;
export const RETRY_DELAY_MS = 1000;

/**
 * Checks if an element is visible in the DOM
 */
export const isElementVisible = (element: Element): boolean => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0';
};

/**
 * Extracts clean text content from an element
 */
export const extractTextContent = (element: Element): string => {
    return (element.textContent || '')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Filters out tracking/analytics images
 */
export const isValidImage = (src: string): boolean => {
    const lowerSrc = src.toLowerCase();
    return !lowerSrc.includes('tracking') &&
           !lowerSrc.includes('analytics') &&
           !lowerSrc.includes('pixel') &&
           !lowerSrc.includes('beacon');
};

/**
 * Converts relative URLs to absolute URLs
 */
export const resolveImageUrl = (src: string, baseUrl: string): string | null => {
    try {
        return new URL(src, baseUrl).toString();
    } catch {
        return null;
    }
};

/**
 * Finds the main content area of the page
 */
export const findMainContent = (): Element => {
    const contentSelectors = [
        'article',
        'main',
        '[role="main"]',
        '.content',
        '#content'
    ];

    for (const selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element && isElementVisible(element)) {
            return element;
        }
    }

    return document.body;
};

/**
 * Extracts meaningful text content from the page
 */
export const extractTextContentFromPage = (mainContent: Element): string => {
    const textSelectors = 'p, h1, h2, h3, h4, h5, h6, li, .article-content, .post-content, .entry-content';
    const textElements = Array.from(mainContent.querySelectorAll(textSelectors))
        .filter(isElementVisible)
        .map(element => ({
            element,
            text: extractTextContent(element)
        }))
        .filter(({ text }) => text.length > 20);

    return textElements
        .map(({ text }) => text)
        .join('\n\n')
        .trim() || document.title || 'No content found';
};

/**
 * Extracts meaningful images from the page
 */
export const extractImagesFromPage = (): string[] => {
    return Array.from(document.querySelectorAll('img'))
        .filter(isElementVisible)
        .map(img => img.getAttribute('src'))
        .filter((src): src is string => src !== null)
        .map(src => resolveImageUrl(src, window.location.href))
        .filter((src): src is string => src !== null)
        .filter(isValidImage)
        .slice(0, MAX_IMAGES);
}; 