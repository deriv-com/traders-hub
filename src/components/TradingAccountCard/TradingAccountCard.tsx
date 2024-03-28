import { ReactNode } from 'react';

type TTradingAccountCardProps = {
    children: ReactNode;
    leading?: () => ReactNode;
    trailing?: () => ReactNode;
};

export const TradingAccountCard = ({ children, leading, trailing }: TTradingAccountCardProps) => {
    return (
        <div className='flex items-center gap-16 py-20'>
            {leading?.()}
            <div className='flex gap-16 items-center grow h-full'>
                {children}
                {trailing?.()}
            </div>
        </div>
    );
};
