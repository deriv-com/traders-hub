import { MarketType, MarketTypeDetails, PlatformDetails } from '@cfd/constants';

import { TradingAccountCard, TradingAccountCardContent, TradingAccountCardLightButton } from '@/components';
import { getCfdsAccountTitle } from '@/helpers/cfdsAccountHelpers';
import { useActiveDerivTradingAccount, useQueryParams, useRegulationFlags } from '@/hooks';
import { useCFDContext } from '@/providers';
import { THooks } from '@/types';

import { MT5AccountIcon } from '../MT5AccountIcon';

export const AvailableMT5AccountsList = ({ account }: { account: THooks.MT5AccountsList }) => {
    const { regulationFlags } = useRegulationFlags();
    const { isEU, hasActiveDerivAccount } = regulationFlags;
    const marketTypeDetails = MarketTypeDetails(isEU)[account.market_type ?? MarketType.ALL];
    const description = marketTypeDetails?.description ?? '';
    const { data: activeTradingAccount } = useActiveDerivTradingAccount();
    const { setCfdState } = useCFDContext();

    const { openModal } = useQueryParams();

    const trailingButtonClick = () => {
        setCfdState({ marketType: account.market_type, platform: PlatformDetails.mt5.platform });

        !activeTradingAccount?.is_virtual && openModal('JurisdictionModal');
        activeTradingAccount?.is_virtual && hasActiveDerivAccount && openModal('MT5PasswordModal');
    };
    const title = getCfdsAccountTitle(marketTypeDetails.title, !!activeTradingAccount?.is_virtual);

    return (
        <TradingAccountCard
            leading={() => <MT5AccountIcon account={account} />}
            trailing={() => <TradingAccountCardLightButton onSubmit={trailingButtonClick} />}
        >
            <TradingAccountCardContent title={title}>{description}</TradingAccountCardContent>
        </TradingAccountCard>
    );
};
