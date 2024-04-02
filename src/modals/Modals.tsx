import { Fragment } from 'react/jsx-runtime';

import { MT5PasswordModal, MT5SuccessModal } from '@/cfd/modals';

import { AccountSelector } from '.';

/**
 * @description The place to import and export all modals
 * @returns  {React.ReactElement}
 */
export const Modals = () => {
    return (
        <Fragment>
            {/* PLS DO NOT ADD ANY PROPS TO ANY MODALS HERE.💥 */}
            <AccountSelector />
            <MT5PasswordModal />
            <MT5SuccessModal />
        </Fragment>
    );
};
