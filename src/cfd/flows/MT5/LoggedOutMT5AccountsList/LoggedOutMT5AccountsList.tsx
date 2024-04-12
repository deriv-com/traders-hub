import { Fragment } from 'react/jsx-runtime';

import { MarketType, MarketTypeDetails } from '@cfd/constants';
import { URLUtils } from '@deriv-com/utils';

import { TradingAccountCard, TradingAccountCardContent, TradingAccountCardLightButton } from '@/components';
import { useRegulationFlags } from '@/hooks';

import { MT5AccountIcon } from '../MT5AccountIcon';

export const LoggedOutMT5AccountsList = () => {
    const { getOauthURL } = URLUtils;
    const { isEU } = useRegulationFlags();
    const marketTypes = [MarketType.SYNTHETIC, MarketType.FINANCIAL, MarketType.ALL];
    return (
        <Fragment>
            {marketTypes.map(marketType => {
                const marketTypeDetails = MarketTypeDetails(isEU)[marketType];
                const description = marketTypeDetails?.description ?? '';
                return (
                    <TradingAccountCard
                        leading={() => <MT5AccountIcon marketType={marketType} />}
                        trailing={() => (
                            <TradingAccountCardLightButton
                                onSubmit={() => {
                                    window.location.href = getOauthURL();
                                }}
                            />
                        )}
                        key={marketType}
                    >
                        <TradingAccountCardContent title={marketTypeDetails.title}>
                            {description}
                        </TradingAccountCardContent>
                    </TradingAccountCard>
                );
            })}
        </Fragment>
    );
};
