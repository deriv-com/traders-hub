import { useState } from 'react';

import { CreatePassword, EnterPassword } from '@cfd/screens';
import { Modal } from '@deriv-com/ui';

import { useAccountStatus, useQueryParams } from '@/hooks';

export const DxtradePasswordModal = () => {
  const [password, setPassword] = useState('');
  const { data: accountStatus } = useAccountStatus();
  const { closeModal, isModalOpen } = useQueryParams();

  const isDxtradePasswordNotSet = accountStatus?.is_dxtrade_password_not_set;

  const PasswordComponent = isDxtradePasswordNotSet ? CreatePassword : EnterPassword;

  return (
    <Modal ariaHideApp={false} isOpen={isModalOpen('DxtradePasswordModal')} onRequestClose={closeModal}>
      <PasswordComponent onPasswordChange={e => setPassword(e.target.value)} password={password} />
    </Modal>
  );
};
