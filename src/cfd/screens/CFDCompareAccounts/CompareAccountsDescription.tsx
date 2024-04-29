import { Fragment } from 'react';

import { Text } from '@deriv-com/ui';

import { useActiveDerivTradingAccount, useRegulationFlags } from '@/hooks';
import { THooks } from '@/types';

import { getJurisdictionDescription } from './CompareAccountsConfig';

type TCompareAccountsDescription = {
    marketType: THooks.AvailableMT5Accounts['market_type'];
    shortCode: THooks.AvailableMT5Accounts['shortcode'];
};

const CompareAccountsDescription = ({ marketType, shortCode }: TCompareAccountsDescription) => {
    const { data: activeTrading } = useActiveDerivTradingAccount();
    const { regulationFlags } = useRegulationFlags();
    const { isEU: isEuRegion } = regulationFlags;
    const isDemo = activeTrading?.is_virtual;
    const marketTypeShortCode = marketType?.concat('_', shortCode ?? '');
    const {
        leverage,
        counterpartyCompany,
        counterpartyCompanyDescription,
        jurisdiction,
        jurisdictionDescription,
        leverageDescription,
        regulator,
        regulatorDescription,
        regulatorLicense,
        spread,
        spreadDescription,
    } = getJurisdictionDescription(marketTypeShortCode ?? '');

    return (
        <div className='flex flex-col items-center gap-5 p-16 lg:px-0'>
            <Text as='p' className='text-default lg:text-xl' weight='bold'>
                {'Up to'} {leverage}
            </Text>
            <Text as='p' className='text-xs lg:text-sm'>
                {!isEuRegion ? leverageDescription : 'Leverage'}
            </Text>
            {!isEuRegion && (
                <Fragment>
                    <Text align='center' as='p' className='text-default lg:text-xl' weight='bold'>
                        {spread}
                    </Text>
                    <Text align='center' as='p' className='text-xs lg:text-sm'>
                        {spreadDescription}
                    </Text>
                </Fragment>
            )}
            {!isDemo && (
                <div className='flex flex-col items-center gap-5 lg:gap-7 lg:px-6'>
                    <Text as='p' size='sm' weight='bold'>
                        {counterpartyCompany}
                    </Text>
                    <Text as='p' className='text-xs lg:text-sm'>
                        {counterpartyCompanyDescription}
                    </Text>
                    <Text align='center' as='p' className='text-default lg:text-default' weight='bold'>
                        {jurisdiction}
                    </Text>
                    <Text as='p' size='xs'>
                        {jurisdictionDescription}
                    </Text>
                    <Text align='center' as='p' className='text-default lg:text-default' weight='bold'>
                        {regulator}
                    </Text>
                    <div>
                        {regulatorLicense && (
                            <Text align='center' as='p' className='text-xs lg:text-sm'>
                                {regulatorLicense}
                            </Text>
                        )}
                        <Text align='center' as='p' className='text-xs lg:text-sm'>
                            {regulatorDescription}
                        </Text>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompareAccountsDescription;
