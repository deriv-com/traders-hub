import { MarketType, PlatformDetails } from '@cfd/constants';

import { useAccountStatus, useActiveDerivTradingAccount, useCreateOtherCFDAccount } from '.';

export const useDxtradeAccountHandler = () => {
    const { data: activeTrading } = useActiveDerivTradingAccount();
    const { data: getAccountStatus, isSuccess: accountStatusSuccess } = useAccountStatus();
    const {
        error: createDxtradeAccountError,
        isPending: createDxtradeAccountLoading,
        isSuccess: createOtherCFDAccountSuccess,
        mutate: createDxtradeAccount,
        status,
    } = useCreateOtherCFDAccount();

    const accountType = activeTrading?.is_virtual ? 'demo' : 'real';
    const dxtradePlatform = PlatformDetails.dxtrade.platform;
    const isDxtradePasswordNotSet = getAccountStatus?.is_dxtrade_password_not_set;

    const handleSubmit = (password: string) => {
        return createDxtradeAccount({
            account_type: accountType,
            market_type: MarketType.ALL,
            password,
            platform: dxtradePlatform,
        });
    };

    return {
        accountStatusSuccess,
        createDxtradeAccountError,
        createDxtradeAccountLoading,
        createOtherCFDAccountSuccess,
        handleSubmit,
        isDxtradePasswordNotSet,
        status,
    };
};
