import { twMerge } from 'tailwind-merge';

import { useActiveDerivTradingAccount, useRegulationFlags } from '@/hooks';
import { THooks, TPlatforms } from '@/types';

import { getHighlightedIconLabel } from './CompareAccountsConfig';
import InstrumentsIconWithLabel from './InstrumentsIconWithLabel';

type TInstrumentsLabelHighlighted = {
    marketType: THooks.AvailableMT5Accounts['market_type'];
    platform: TPlatforms.All;
    shortCode: THooks.AvailableMT5Accounts['shortcode'];
};

const InstrumentsLabelHighlighted = ({ marketType, platform, shortCode }: TInstrumentsLabelHighlighted) => {
    const { data: activeDerivTrading } = useActiveDerivTradingAccount();
    const { regulationFlags } = useRegulationFlags();
    const { isEU: isEuRegion } = regulationFlags;
    const isDemo = activeDerivTrading?.is_virtual;
    const iconData = [...getHighlightedIconLabel(platform, isEuRegion, marketType, shortCode)];

    return (
        <div
            className={twMerge('flex flex-col pt-20 px-14 lg:px-18 gap-4', isDemo && 'pt-16')}
            data-testid='dt_compare_cfd_account_outline__container'
        >
            {iconData.map(item => (
                <InstrumentsIconWithLabel key={item.text} {...item} />
            ))}
        </div>
    );
};

export default InstrumentsLabelHighlighted;
