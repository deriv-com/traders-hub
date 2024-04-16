import { useServiceToken } from '@deriv-com/api-hooks';

import { useActiveDerivTradingAccount } from './useActiveDerivTradingAccount';

/** A custom hook that get Service Token for CTrader Platform. */
export const useCtraderServiceToken = () => {
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();

    const { data: ctraderToken, ...rest } = useServiceToken({
        payload: { service: 'ctrader', server: activeTradingAccount?.isVirtual ? 'demo' : 'real' },
    });

    return { data: ctraderToken?.ctrader?.token, ...rest };
};
