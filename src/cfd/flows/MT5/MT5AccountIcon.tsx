import React from 'react';

import { MarketType, MarketTypeDetails } from '@cfd/constants';
import { URLUtils } from '@deriv-com/utils';

import { useRegulationFlags } from '@/hooks';
import { THooks, TMarketTypes } from '@/types';

type MT5AccountIconProps = {
    account?: THooks.MT5AccountsList;
    marketType?: TMarketTypes.All;
};

export const MT5AccountIcon = ({ account, marketType }: MT5AccountIconProps) => {
    const { getDerivStaticURL } = URLUtils;
    const { isEU } = useRegulationFlags();

    const handleClick = () => {
        window.open(getDerivStaticURL('/dmt5'));
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Fix sonarcloud issue
        if (event.key === 'Enter' || event.key === ' ') {
            handleClick();
        }
    };

    const marketTypeToUse = marketType ?? account?.market_type ?? MarketType.ALL;

    const marketTypeDetails = MarketTypeDetails(isEU)[marketTypeToUse];

    const icon = marketTypeDetails?.icon ?? null;

    return (
        <div className='cursor-pointer' onClick={handleClick} onKeyDown={handleKeyDown} role='button' tabIndex={0}>
            {icon}
        </div>
    );
};
