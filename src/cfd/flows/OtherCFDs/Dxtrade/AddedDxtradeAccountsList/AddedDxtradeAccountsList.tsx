import { Fragment } from 'react';

import { CFDPlatforms, PlatformDetails } from '@cfd/constants';
import { Button, Text } from '@deriv-com/ui';
import { URLUtils } from '@deriv-com/utils';

import { IconComponent, TradingAccountCard } from '@/components';
import { getCfdsAccountTitle } from '@/helpers/cfdsAccountHelpers';
import { useActiveDerivTradingAccount, useDxtradeAccountsList, useQueryParams } from '@/hooks';
import { useCFDContext } from '@/providers';

const { getDerivStaticURL } = URLUtils;

const LeadingIcon = () => (
  <IconComponent
    icon='DerivX'
    onClick={() => {
      window.open(getDerivStaticURL('/derivx'));
    }}
  />
);

export const AddedDxtradeAccountsList = () => {
  const { data: dxTradeAccounts } = useDxtradeAccountsList();
  const { data: activeTrading } = useActiveDerivTradingAccount();
  const { openModal } = useQueryParams();
  const { setCfdState } = useCFDContext();
  const account = dxTradeAccounts?.find(account => account.is_virtual === activeTrading?.isVirtual);
  const isVirtual = account?.is_virtual;
  const title = getCfdsAccountTitle(PlatformDetails.dxtrade.title, isVirtual);

  const trailing = () => (
    <div className='flex flex-col gap-y-4'>
      <Button
        // open transfer modal
        color='black'
        onClick={() => {
          if (isVirtual) {
            setCfdState({
              account,
              platform: CFDPlatforms.DXTRADE,
            });
            openModal('TopUpModal');
          }
          // else transferModal;
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
            platform: CFDPlatforms.DXTRADE,
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
    <TradingAccountCard leading={LeadingIcon} trailing={trailing}>
      <div className='flex flex-col flex-grow'>
        {account && (
          <Fragment>
            <Text size='sm'>{title}</Text>
            <Text size='sm' weight='bold'>
              {account?.display_balance}
            </Text>
            <Text color='primary' size='sm'>
              {account?.login}
            </Text>
          </Fragment>
        )}
      </div>
    </TradingAccountCard>
  );
};
