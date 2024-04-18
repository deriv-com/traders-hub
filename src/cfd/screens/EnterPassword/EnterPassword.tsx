import { ChangeEvent, Fragment } from 'react';

import { Category, CFDPlatforms, MarketType, MarketTypeDetails, PlatformDetails } from '@cfd/constants';
import { Modal, PasswordInput, Text, useDevice } from '@deriv-com/ui';

import { useActiveDerivTradingAccount, useQueryParams, useRegulationFlags } from '@/hooks';
import { useCFDContext } from '@/providers';

import DxtradePasswordFooter from '../../modals/DxtradePasswordModal/DxtradePasswordFooter';
import MT5PasswordFooter from '../../modals/MT5PasswordModal/MT5PasswordFooter';

type TEnterPasswordProps = {
    onPasswordChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    password: string;
};

/**
 * Component to display the enter password screen
 * @param {Function} onPasswordChange - callback to handle password change
 * @param {string} password - password value
 */

export const EnterPassword = ({ onPasswordChange, password }: TEnterPasswordProps) => {
    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;
    const { cfdState } = useCFDContext();
    const { data } = useActiveDerivTradingAccount();
    const { closeModal } = useQueryParams();

    const marketTypeDetails = MarketTypeDetails(isEU);
    const { marketType = MarketType.ALL, platform = CFDPlatforms.MT5 } = cfdState;
    const { title } = PlatformDetails[platform];
    const accountType = data?.is_virtual ? Category.DEMO : Category.REAL;
    const marketTypeTitle =
        platform === PlatformDetails.dxtrade.platform ? accountType : marketTypeDetails[marketType]?.title;
    const { isDesktop } = useDevice();

    return (
        <Fragment>
            <Modal.Header onRequestClose={closeModal}>
                {isDesktop && <Text weight='bold'>{`Enter your ${title} password`}</Text>}
            </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-16 lg:w-[400px] lg:gap-8 lg:pt-24 lg:px-24 items-center pt-24 '>
                    {!isDesktop && <Text weight='bold'>{`Enter your ${title} password`}</Text>}
                    <Text size='sm'>
                        Enter your {title} password to add a {title} {marketTypeTitle} account.
                    </Text>
                    <PasswordInput
                        isFullWidth={isDesktop}
                        label={`${title} password`}
                        onChange={onPasswordChange}
                        value={password}
                        hidePasswordMeter
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                {platform === CFDPlatforms.MT5 ? (
                    <MT5PasswordFooter password={password} />
                ) : (
                    <DxtradePasswordFooter password={password} />
                )}
            </Modal.Footer>
        </Fragment>
    );
};
