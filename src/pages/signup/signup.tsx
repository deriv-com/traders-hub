import { useEffect } from 'react';

import { useQueryParams } from '@/hooks';

export const Signup = () => {
    const { openModal, isModalOpen } = useQueryParams();

    useEffect(() => {
        openModal('Signup');
    }, [isModalOpen, openModal]);

    return null;
};
