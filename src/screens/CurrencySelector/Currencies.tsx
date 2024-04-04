import { InlineMessage, Text } from '@deriv-com/ui';

import { CurrencyTypes } from '@/constants';
import { TCurrencyConfig } from '@/hooks/useCurrencies';
import { cn } from '@/utils';

import { CurrencyCard } from './CurrencyCard';

type TCurrencies = {
    list: TCurrencyConfig[];
    type: keyof typeof CurrencyTypes;
};

/**
 * @name Currencies
 * @description The Currencies component is used to display the currencies in the currency selector screen.
 * @param type - The type of the currency.
 * @param list - The list of the currency.
 * @returns React.ReactNode
 * @example <Currencies type={type} />
 * @example <Currencies type={CurrencyTypes.FIAT} />
 */
export const Currencies = ({ type, list: currencies = [] }: TCurrencies) => {
    return (
        <div className='text-center'>
            <Text align='center' as='p' className='mb-6' weight='bold'>
                {type === CurrencyTypes.CRYPTO ? 'Cryptocurrencies' : 'Fiat Currencies'}
            </Text>
            {type === CurrencyTypes.FIAT && (
                <InlineMessage className='my-16 lg:w-fit' variant='info'>
                    <Text as='p' size='xs'>
                        Please note that you can only have 1 fiat account.
                    </Text>
                </InlineMessage>
            )}
            <div className={cn('flex flex-wrap justify-start', currencies.length < 4 ? 'lg:justify-center' : '')}>
                {currencies?.map(currency => (
                    <CurrencyCard id={currency?.id ?? ''} key={currency?.id} title={currency?.name ?? ''} />
                ))}
            </div>
        </div>
    );
};
