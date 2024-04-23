import { Navigate, useLocation } from 'react-router-dom';

import { routes } from '@/routes';

export const Redirect = () => {
    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const actionParam = urlParams.get('action');
    const verificationCode = urlParams.get('code');
    localStorage.setItem('verification_code', verificationCode ?? '');

    if (actionParam === 'signup') {
        return <Navigate to={routes.signup + search} />;
    }

    return <Navigate to={routes.home} replace />;
};
