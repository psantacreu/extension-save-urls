export const isWithinDateRange = (timestamp: number, range: string): boolean => {
    const now = Date.now();
    const diffInDays = Math.floor((now - timestamp) / (1000 * 60 * 60 * 24));

    switch (range) {
        case 'today':
            return diffInDays === 0;
        case 'week':
            return diffInDays <= 7;
        case 'month':
            return diffInDays <= 30;
        default:
            return true;
    }
}; 