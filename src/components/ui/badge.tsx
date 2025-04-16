import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
    className,
    variant = 'default',
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                {
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80': variant === 'default',
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
                    'text-foreground': variant === 'outline',
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}; 