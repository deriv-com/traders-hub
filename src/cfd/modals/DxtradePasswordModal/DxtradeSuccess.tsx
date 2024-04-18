import { SuccessButtonGroup } from '@cfd/components';
import { CFDSuccess } from '@cfd/screens';

import { useActiveDerivTradingAccount } from '@/hooks';

import { Category, PlatformDetails } from '../../constants';

export const DxtradeSuccess = () => {
    const { data: activeTrading } = useActiveDerivTradingAccount();
    const isDemo = activeTrading?.is_virtual;

    const successDescription = isDemo
        ? `Congratulations, you have successfully created your ${Category.DEMO} ${PlatformDetails.dxtrade.title} account.`
        : `Congratulations, you have successfully created your ${Category.REAL} ${PlatformDetails.dxtrade.title} account. To start trading, transfer funds from your Deriv account into this account.`;

    return (
        <CFDSuccess
            description={successDescription}
            platform={PlatformDetails.dxtrade.platform}
            renderButtons={SuccessButtonGroup}
        />
    );
};
