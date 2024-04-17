import { Fragment } from 'react/jsx-runtime';

import { DxtradePasswordModal, MT5PasswordModal, MT5SuccessModal, TradeModal } from '@/cfd/modals';
import { RealAccountCreation } from '@/flows';

import { JurisdictionModal } from './JurisdictionModal';
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
            <AccountOpeningSuccessModal />
            <DxtradePasswordModal />
            <JurisdictionModal />
            <MT5PasswordModal />
            <MT5SuccessModal />
            <RealAccountCreation />
            <RegulationModal />
            <TradeModal />
        </Fragment>
    );
};
