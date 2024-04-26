import { twJoin } from 'tailwind-merge';

import { Text } from '@deriv-com/ui';

import { TPlatforms } from '@/types';

import {
    CompareAccountsPlatformLabelClass,
    CompareAccountsPlatformLabelTextColorClass,
    TCompareAccountsPlatformLabelClassProps,
    TCompareAccountsPlatformLabelTextClassProps,
} from './CompareAccounts.classnames';
import { getPlatformType } from './CompareAccountsConfig';
import { platformLabel } from './constants';

type TCompareAccountsPlatformLabel = {
    platform: TPlatforms.All;
};

const CompareAccountsPlatformLabel = ({ platform }: TCompareAccountsPlatformLabel) => {
    const platformType = getPlatformType(platform);

    return (
        <div
            className={twJoin(
                CompareAccountsPlatformLabelClass({
                    background: platformType,
                } as TCompareAccountsPlatformLabelClassProps)
            )}
        >
            <Text
                className={twJoin(
                    CompareAccountsPlatformLabelTextColorClass({
                        label: platformType,
                    } as TCompareAccountsPlatformLabelTextClassProps)
                )}
                size='sm'
                weight='bold'
            >
                {platformLabel[platformType]}
            </Text>
        </div>
    );
};

export default CompareAccountsPlatformLabel;
