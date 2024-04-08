import { ReactNode } from 'react';

import { PlatformDetails } from '@cfd/constants';

import CTraderSuccess from '@/assets/cfd/ctrader-success.svg?react';
import DerivXSuccess from '@/assets/cfd/dxtrade-success.svg?react';
import MT5DerivedSuccess from '@/assets/cfd/mt5-derived-success.svg?react';
import MT5FinancialSuccess from '@/assets/cfd/mt5-financial-success.svg?react';
import MT5SwapFreeSuccess from '@/assets/cfd/mt5-swap-free-success.svg?react';
import CheckMark from '@/assets/svgs/checkmark.svg?react';
import { ActionScreen } from '@/components';
import { TMarketTypes, TPlatforms } from '@/types';

type TCFDSuccessProps = {
    description: string;
    renderButtons?: () => ReactNode;
} & (
    | {
          displayBalance: string;
          landingCompany?: string;
          marketType: TMarketTypes.SortedMT5Accounts;
          platform: TPlatforms.MT5;
          title: string;
      }
    | {
          marketType?: never;
          platform: TPlatforms.OtherAccounts;
      }
);

type TPlatformDetails = Partial<{
    all: { icon: ReactNode };
    financial: { icon: ReactNode };
    icon: ReactNode;
    synthetic: { icon: ReactNode };
}>;

const marketTypeToDetailsMapper: Record<TPlatforms.All, TPlatformDetails> = {
    ctrader: {
        icon: <CTraderSuccess />,
    },
    dxtrade: {
        icon: <DerivXSuccess />,
    },
    mt5: {
        all: {
            icon: <MT5SwapFreeSuccess />,
        },
        financial: {
            icon: <MT5FinancialSuccess />,
        },
        synthetic: {
            icon: <MT5DerivedSuccess />,
        },
    },
};

export const CFDSuccess = ({ description, marketType, platform, renderButtons }: TCFDSuccessProps) => {
    let icon: ReactNode;
    if (platform === 'mt5') {
        icon = marketTypeToDetailsMapper[platform][marketType]?.icon;
    } else {
        icon = PlatformDetails[platform as keyof typeof PlatformDetails]?.icon();
    }

    const IconWithCheckMark = () => (
        <div className='relative'>
            {icon}
            <CheckMark className='absolute bottom-0 left-[100px]' />
        </div>
    );

    return (
        <ActionScreen
            className='w-[440px] h-[364px] p-24'
            description={description}
            icon={<IconWithCheckMark />}
            renderButtons={renderButtons}
            title='Success!'
        />
    );
};
