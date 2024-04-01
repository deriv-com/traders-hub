import { useEffect } from 'react';

import { Button } from '@deriv-com/ui';

import { useMT5AccountHandler, useQueryParams } from '@/hooks';

type TCreateAccountButtonProps = {
    buttonText: string;
    password: string;
};

export const MT5CreateAccountButton = ({ buttonText, password }: TCreateAccountButtonProps) => {
    const {
        createMT5AccountLoading,
        doesNotMeetPasswordPolicy,
        handleSubmit,
        tradingPlatformPasswordChangeLoading,
        createMT5AccountStatus,
    } = useMT5AccountHandler();
    const { openModal } = useQueryParams();

    const isLoading = tradingPlatformPasswordChangeLoading || createMT5AccountLoading;
    const isDisabled = !password || isLoading;

    useEffect(() => {
        if (doesNotMeetPasswordPolicy) {
            return openModal('MT5ChangePasswordModal');
        }

        if (createMT5AccountStatus === 'success') {
            openModal('MT5SuccessModal');
        }
    }, [doesNotMeetPasswordPolicy, createMT5AccountStatus, openModal]);

    return (
        <Button disabled={isDisabled} isLoading={isLoading} onClick={() => handleSubmit(password)}>
            {buttonText}
        </Button>
    );
};
