import { useEffect } from 'react';

import { PlatformDetails } from '@cfd/constants';
import { URLUtils } from '@deriv-com/utils';

import {
  IconComponent,
  TradingAccountCard,
  TradingAccountCardContent,
  TradingAccountCardLightButton,
} from '@/components';
import { getCfdsAccountTitle } from '@/helpers/cfdsAccountHelpers';
import { useActiveDerivTradingAccount, useCreateOtherCFDAccount, useQueryParams, useRegulationFlags } from '@/hooks';
import { useUIContext } from '@/providers';

const { getDerivStaticURL } = URLUtils;

const LeadingIcon = () => (
  <IconComponent
    icon='CTrader'
    onClick={() => {
      window.open(getDerivStaticURL('/deriv-ctrader'));
    }}
  />
);

export const AvailableCTraderAccountsList = () => {
  const { mutate, status } = useCreateOtherCFDAccount();
  const { data: activeTradingAccount } = useActiveDerivTradingAccount();
  const { hasActiveDerivAccount } = useRegulationFlags();
  const { setUIState } = useUIContext();
  const { openModal } = useQueryParams();

  const accountType = activeTradingAccount?.is_virtual ? 'demo' : 'real';
  const title = getCfdsAccountTitle(PlatformDetails.ctrader.title, activeTradingAccount?.isVirtual);

  const onSubmit = () => {
    if (!hasActiveDerivAccount) {
      // TODO: GetDerivAccountDialog here
    } else {
      mutate({
        account_type: accountType,
        market_type: 'all',
        platform: PlatformDetails.ctrader.platform,
      });
    }
  };

  useEffect(() => {
    if (status === 'success') {
      setUIState({ accountType });
      openModal('CTraderSuccessModal');
    }
  }, [accountType, openModal, setUIState, status]);

  return (
    <TradingAccountCard leading={LeadingIcon} trailing={() => <TradingAccountCardLightButton onSubmit={onSubmit} />}>
      <TradingAccountCardContent title={title}>
        This account offers CFDs on a feature-rich trading platform.
      </TradingAccountCardContent>
    </TradingAccountCard>
  );
};
