import { AddAccountButtonsGroup, SuccessButtonGroup } from '@cfd/components';
import { PlatformDetails } from '@cfd/constants';

import { useDxtradeAccountHandler, useDxtradeAccountsList } from '@/hooks';

import { DxtradeCreateAccountButton } from './DxtradeCreateAccountButton';

type TDxtradePasswordFooterProps = {
    password: string;
};

const DxtradePasswordFooter = ({ password }: TDxtradePasswordFooterProps) => {
    const { data: dxtradeAccounts } = useDxtradeAccountsList();
    const { createOtherCFDAccountSuccess } = useDxtradeAccountHandler();
    const hasDxtradeAccount = dxtradeAccounts?.find(account => account.login);

    if (createOtherCFDAccountSuccess) return <SuccessButtonGroup />;

    if (hasDxtradeAccount) return <AddAccountButtonsGroup password={password} />;

    return (
        <DxtradeCreateAccountButton
            buttonText={`Create ${PlatformDetails.dxtrade.title} password`}
            password={password}
        />
    );
};
export default DxtradePasswordFooter;
