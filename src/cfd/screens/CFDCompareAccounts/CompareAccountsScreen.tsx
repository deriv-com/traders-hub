import { useCFDCompareAccounts } from '@/hooks';

import { CompareAccountsCarousel } from '../../components/CompareAccountsCarousel';

import CFDCompareAccountsCard from './CompareAccountsCard';
import CompareAccountsHeader from './CompareAccountsHeader';
import CTraderCompareAccountsCard from './CTraderCompareAccountsCard';
import DerivXCompareAccountsCard from './DerivXCompareAccountsCard';

const CompareAccountsScreen = () => {
    const { data: compareAccounts } = useCFDCompareAccounts();

    const { mt5Accounts } = compareAccounts;

    return (
        <div className='mt-10 overflow-x-auto lg:w-full lg:h-full'>
            <CompareAccountsHeader />
            <div className='flex justify-center lg:my-0 lg:mx-auto max-w-[1232px] px-10 py-16 lg:py-24'>
                <CompareAccountsCarousel>
                    {mt5Accounts?.map(item => (
                        <CFDCompareAccountsCard
                            isAccountAdded={item?.is_added}
                            key={`${item?.market_type} ${item?.shortcode}`}
                            marketType={item?.market_type}
                            platform={item?.platform}
                            shortCode={item?.shortcode}
                        />
                    ))}
                    <CTraderCompareAccountsCard />
                    <DerivXCompareAccountsCard />
                </CompareAccountsCarousel>
            </div>
        </div>
    );
};

export default CompareAccountsScreen;
