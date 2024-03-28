import { Text } from '@deriv-com/ui';

import { IconToCurrencyMapperType } from '@/constants';

type DemoCurrencySwitcherAccountInfoProps = {
    displayBalance: number | string;
};

type RealCurrencySwitcherAccountInfoProps = {
    currencyText: IconToCurrencyMapperType['currency_text']['text'];
    displayBalance?: number | string;
};

export const DemoCurrencySwitcherAccountInfo = ({ displayBalance }: DemoCurrencySwitcherAccountInfoProps) => (
    <div className='flex flex-col'>
        <Text className='font-light text-system-light-less-prominent-text' size='sm' weight='bold'>
            Demo
        </Text>
        <Text className='text-status-light-information' size='sm' weight='bold'>
            {displayBalance}
        </Text>
    </div>
);

export const RealCurrencySwitcherAccountInfo = ({
    currencyText,
    displayBalance,
}: RealCurrencySwitcherAccountInfoProps) => (
    <div className='flex flex-col'>
        <Text className='text-status-light-success' size='sm' weight='bold'>
            {displayBalance ?? '0.00'}
        </Text>
        <Text className='text-system-light-less-prominent-text' size='sm'>
            {currencyText}
        </Text>
    </div>
);
