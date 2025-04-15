export type MessageType = 'SUMMARIZE_URL';

export interface Message {
    type: MessageType;
    payload?: any;
}

export interface Response {
    status: 'success' | 'error' | 'received';
    data?: any;
    error?: string;
}