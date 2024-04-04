import { DxtradeCreateAccountButton, MT5CreateAccountButton } from '@cfd/modals';
import { Button } from '@deriv-com/ui';

import { ButtonGroup } from '@/components';
import { useQueryParams } from '@/hooks';
import { useCFDContext } from '@/providers';

import { PlatformDetails } from '../../constants';

type TAddAccountButtonsGroupProps = {
  password: string;
};

export const AddAccountButtonsGroup = ({ password }: TAddAccountButtonsGroupProps) => {
  const { cfdState } = useCFDContext();
  const { platform } = cfdState;
  const { openModal } = useQueryParams();

  return (
    <ButtonGroup className='justify-end w-full'>
      <Button color='black' onClick={() => openModal('SentEmailContentModal')} variant='outlined'>
        Forgot password?
      </Button>
      {platform === PlatformDetails.dxtrade.platform && (
        <DxtradeCreateAccountButton buttonText='Add account' password={password} />
      )}
      {platform === PlatformDetails.mt5.platform && (
        <MT5CreateAccountButton buttonText='Add account' password={password} />
      )}
    </ButtonGroup>
  );
};
