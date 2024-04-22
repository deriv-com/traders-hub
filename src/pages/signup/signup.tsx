import { useEffect } from 'react';

import { IconComponent } from '@/components';
import { useQueryParams } from '@/hooks';

import { Signup as SignupModal } from '../../flows/Signup';

export const Signup = () => {
    const { openModal, isModalOpen } = useQueryParams();

    useEffect(() => {
        openModal('Signup');
    }, [isModalOpen, openModal]);

    return (
        <>
            <div className='flex justify-center items-center'>
                <IconComponent icon='Deriv' height={90} width={90} />
            </div>
            <SignupModal />
        </>
    );
};
