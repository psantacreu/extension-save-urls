import { ErrorState, ErrorCode } from './index';

export interface ScrapedContent {
    text: string;
    images: string[];
}

export interface ContentElement {
    element: Element;
    text: string;
}

export class ScraperError extends ErrorState {
    constructor(error: { message: string; code: ErrorCode.SCRAPING_ERROR | ErrorCode.TAB_ERROR | ErrorCode.UNKNOWN_ERROR }) {
        super(error);
        this.name = 'ScraperError';
    }
} 