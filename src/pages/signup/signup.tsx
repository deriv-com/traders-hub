import { useEffect } from 'react';

import { useDevice } from '@deriv-com/ui';

import { IconComponent } from '@/components';
import { useQueryParams } from '@/hooks';
import { setPerformanceValue } from '@/utils';

import { Signup as SignupModal } from '../../flows/Signup';

export const Signup = () => {
    const { openModal, isModalOpen } = useQueryParams();

    const { isMobile } = useDevice();

    useEffect(() => {
        openModal('Signup');
    }, [isModalOpen, openModal]);

    // leave it here for now
    setPerformanceValue('signup_time', isMobile);

    return (
        <>
            <div className='flex justify-center items-center'>
                <IconComponent icon='Deriv' height={90} width={90} />
            </div>
            <SignupModal />
        </>
    );
};
