import { useEffect } from 'react';

import { Button } from '@deriv-com/ui';

import { useDxtradeAccountHandler, useQueryParams } from '@/hooks';

type TCreateAccountButtonProps = {
  buttonText: string;
  password: string;
};

export const DxtradeCreateAccountButton = ({ buttonText, password }: TCreateAccountButtonProps) => {
  const { createDxtradeAccountLoading, createOtherCFDAccountSuccess, status, handleSubmit } =
    useDxtradeAccountHandler();

  const { openModal } = useQueryParams();

  const isDisabled = !password || createDxtradeAccountLoading;

  useEffect(() => {
    if (status === 'success' || createOtherCFDAccountSuccess) {
      openModal('DxtradeSuccessModal');
    }
  }, [openModal, status, createOtherCFDAccountSuccess]);

  return (
    <Button disabled={isDisabled} isLoading={createDxtradeAccountLoading} onClick={() => handleSubmit(password)}>
      {buttonText}
    </Button>
  );
};
