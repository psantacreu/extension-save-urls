import React from 'react';

interface LoadingStateProps {
    message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => (
    <div className="flex justify-center items-center py-5">
        <span className="text-muted-foreground">{message}</span>
    </div>
); 