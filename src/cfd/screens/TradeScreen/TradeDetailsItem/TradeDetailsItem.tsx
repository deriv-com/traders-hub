import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useHover } from 'usehooks-ts';

import { Button, Text, Tooltip, useDevice } from '@deriv-com/ui';

import EditIcon from '@/assets/svgs/ic-edit.svg?react';
import { Clipboard } from '@/components';
import { useQueryParams } from '@/hooks';

type TTradeDetailsItemProps = {
    className?: string;
    label?: string;
    value: string;
    variant?: 'clipboard' | 'info' | 'password';
};

export const TradeDetailsItem = ({ className, label, value, variant = 'clipboard' }: TTradeDetailsItemProps) => {
    const { isDesktop } = useDevice();
    const hoverRef = useRef(null);
    const isHovered = useHover(hoverRef);
    const { openModal } = useQueryParams();
    return (
        <div
            className={twMerge(
                'flex items-center h-32 justify-between bg-system-light-secondary-background p-5 pl-8',
                className
            )}
        >
            {label && <Text size='sm'>{label}</Text>}
            <div className='flex items-center gap-x-8'>
                {variant === 'info' ? (
                    <Text color='less-prominent' size='sm'>
                        {value}
                    </Text>
                ) : (
                    <Text size='sm' weight='bold'>
                        {value}
                    </Text>
                )}
                {variant === 'clipboard' && <Clipboard textCopy={value} />}
                {variant === 'password' && (
                    <Tooltip
                        position='left'
                        triggerAction={isHovered && isDesktop ? 'hover' : 'click'}
                        message='Change password'
                    >
                        <div ref={hoverRef}>
                            <Button className='underline' color='white' size='sm' variant='ghost'>
                                <EditIcon className='cursor-pointer' onClick={() => openModal('ChangePassword')} />
                            </Button>
                        </div>
                    </Tooltip>
                )}
            </div>
        </div>
    );
};
