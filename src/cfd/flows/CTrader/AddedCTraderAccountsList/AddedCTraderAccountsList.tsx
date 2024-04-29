import { Fragment } from 'react';

import { CFDPlatforms, PlatformDetails } from '@cfd/constants';
import { Button, Text } from '@deriv-com/ui';
import { URLUtils } from '@deriv-com/utils';

import { IconComponent, TradingAccountCard } from '@/components';
import { derivUrls } from '@/helpers';
import { getCfdsAccountTitle } from '@/helpers/cfdsAccountHelpers';
import { useActiveDerivTradingAccount, useCtraderAccountsList, useQueryParams } from '@/hooks';
import { useCFDContext } from '@/providers';

const { getDerivStaticURL } = URLUtils;

const LeadingIcon = () => (
    <IconComponent
        icon='CTrader'
        onClick={() => {
            window.open(getDerivStaticURL('/deriv-ctrader'));
        }}
    />
);

export const AddedCTraderAccountsList = () => {
    const { data: cTraderAccounts } = useCtraderAccountsList();
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();
    const { openModal } = useQueryParams();
    const { setCfdState } = useCFDContext();
    const account = cTraderAccounts?.find(account => account.is_virtual === activeTradingAccount?.isVirtual);
    const isVirtual = account?.is_virtual;
    const title = getCfdsAccountTitle(PlatformDetails.ctrader.title, isVirtual);

    const trailing = () => (
        <div className='flex flex-col gap-y-4'>
            <Button
                // todo: open transfer modal
                color='black'
                onClick={() => {
                    if (isVirtual) {
                        setCfdState({
                            account,
                            platform: CFDPlatforms.CTRADER,
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
                        platform: CFDPlatforms.CTRADER,
                    });
                    openModal('TradeModal');
                }}
                size='sm'
            >
                Open
            </Button>
        </div>
    );

    return (
        <div>
            <TradingAccountCard leading={LeadingIcon} trailing={trailing}>
                <div className='flex flex-col flex-grow'>
                    {account && (
                        <Fragment>
                            <Text size='sm'>{title}</Text>
                            <Text size='sm' weight='bold'>
                                {account?.display_balance}
                            </Text>
                            <Text color='primary' size='sm'>
                                {account.login}
                            </Text>
                        </Fragment>
                    )}
                </div>
            </TradingAccountCard>
        </div>
    );
};
