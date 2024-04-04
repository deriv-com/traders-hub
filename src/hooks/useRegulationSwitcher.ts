import { useEffect } from 'react';

import { useAuthData } from '@deriv-com/api-hooks';

import { Regulation } from '@/constants';
import { useActiveDerivTradingAccount, useDerivTradingAccountsList, useRegulationFlags } from '@/hooks';
import { useUIContext } from '@/providers';
/**
 * @description This hook contains the logic that is used to switch between EU and non-EU accounts
 * @returns  {buttons: {label: string}[], handleButtonClick: (label: string) => void}
 * @example
 * const { buttons, handleButtonClick } = useRegulationSwitcher();
 */
export const useRegulationSwitcher = () => {
  const { switchAccount } = useAuthData();
  const { data: tradingAccountsList } = useDerivTradingAccountsList();
  const { setUIState, uiState } = useUIContext();
  const currentRegulation = uiState.regulation;
  const { isEU, isHighRisk } = useRegulationFlags();

  const realCRAccount = tradingAccountsList?.find(account => account.loginid.startsWith('CR'))?.loginid ?? '';
  const realMFAccount = tradingAccountsList?.find(account => account.loginid.startsWith('MF'))?.loginid ?? '';

  const { data: activeTrading } = useActiveDerivTradingAccount();

  const buttons = [{ label: Regulation.NonEU }, { label: Regulation.EU }];

  const handleButtonClick = (label: string) => {
    if (label !== currentRegulation) {
      if (label === Regulation.NonEU) {
        setUIState({
          regulation: Regulation.NonEU,
        });
        if (realCRAccount) {
          switchAccount(realCRAccount);
        }
      } else {
        setUIState({
          regulation: Regulation.EU,
        });
        if (realMFAccount) {
          switchAccount(realMFAccount);
        }
      }
    }
  };

  useEffect(() => {
    if (activeTrading?.loginid.startsWith('CR') || isHighRisk) {
      setUIState({
        regulation: Regulation.NonEU,
      });
    } else if (activeTrading?.loginid.startsWith('MF') || isEU) {
      setUIState({
        regulation: Regulation.EU,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // Contains the array of buttons to be rendered in the switcher E.g. [{label: 'EU'}, {label: 'Non-EU'}]
    buttons,
    // Contains the function to be called when a button is clicked and to update the state E.g. (label: string) => void
    handleButtonClick,
  };
};
