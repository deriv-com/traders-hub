import { Fragment } from 'react/jsx-runtime';

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
        </Fragment>
    );
};
