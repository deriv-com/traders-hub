import { Fragment } from 'react/jsx-runtime';

import { MT5PasswordModal, MT5SuccessModal } from '@/cfd/modals';
import { RealAccountCreation } from '@/flows';

import { RegulationModal } from './RegulationModal';
import { AccountOpeningSuccessModal, AccountSelector } from '.';

/**
 * @description The place to import and export all modals
 * @returns  React.ReactElement
 */
export const Modals = () => {
    return (
        <Fragment>
            {/* PLS DO NOT ADD ANY PROPS TO ANY MODALS HERE.💥 */}
            <AccountSelector />
            <RealAccountCreation />
            <AccountOpeningSuccessModal />
            <MT5PasswordModal />
            <MT5SuccessModal />
            <RegulationModal />
        </Fragment>
    );
};
