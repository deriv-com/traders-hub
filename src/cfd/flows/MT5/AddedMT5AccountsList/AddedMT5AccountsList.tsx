import { CFDPlatforms, MarketType, MarketTypeDetails } from '@cfd/constants';
import { Button, Text } from '@deriv-com/ui';

import { TradingAccountCard } from '@/components';
import { derivUrls, getCfdsAccountTitle } from '@/helpers';
import { useActiveDerivTradingAccount, useQueryParams, useRegulationFlags } from '@/hooks';
import { useCFDContext } from '@/providers';
import { THooks } from '@/types';

import { MT5AccountIcon } from '../MT5AccountIcon';

export const AddedMT5AccountsList = ({ account }: { account: THooks.MT5AccountsList }) => {
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();
    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;
    const { openModal } = useQueryParams();
    const { setCfdState } = useCFDContext();

    const isVirtual = account.is_virtual;
    const marketTypeDetails = MarketTypeDetails(isEU)[account.market_type ?? MarketType.ALL];
    const title = getCfdsAccountTitle(marketTypeDetails.title, !!activeTradingAccount?.is_virtual);

    return (
        <TradingAccountCard
            leading={() => <MT5AccountIcon account={account} />}
            trailing={() => (
                <div className='flex flex-col gap-y-4'>
                    <Button
                        color='black'
                        onClick={() => {
                            if (isVirtual) {
                                setCfdState({
                                    account,
                                    platform: CFDPlatforms.MT5,
                                });
                                openModal('TopUpModal');
                            }
                            window.location.href = `${derivUrls.DERIV_APP_PRODUCTION}/cashier/account-transfer`;
                        }}
                        variant='outlined'
                        size='sm'
                    >
                        {isVirtual ? 'Top up' : 'Transfer'}
                    </Button>
                    <Button
                        onClick={() => {
                            setCfdState({
                                account,
                                marketType: account?.market_type,
                                platform: CFDPlatforms.MT5,
                            });
                            openModal('TradeModal');
                        }}
                        size='sm'
                    >
                        Open
                    </Button>
                </div>
            )}
        >
            <div className='flex-grow'>
                <div className='flex items-center self-stretch gap-8'>
                    <Text size='sm'>{title}</Text>
                    {!activeTradingAccount?.is_virtual && (
                        <div className='flex items-center h-24 gap-4 px-4 rounded-sm bg-system-light-secondary-background'>
                            <Text as='p' size='2xs' weight='bold'>
                                {account.landing_company_short?.toUpperCase()}
                            </Text>
                        </div>
                    )}
                </div>
                <div className='flex flex-col'>
                    <Text as='p' size='sm' weight='bold'>
                        {account.display_balance}
                    </Text>
                    <Text size='sm'>{account.display_login}</Text>
                </div>
            </div>
        </TradingAccountCard>
    );
};
