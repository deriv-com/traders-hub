import { Navigate, useLocation } from 'react-router-dom';

import { routes } from '@/routes';

export const Redirect = () => {
    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const actionParam = urlParams.get('action');

    if (actionParam === 'signup') {
        return <Navigate to={routes.signup + search} replace />;
    }

    return <Navigate to={routes.home} replace />;
};
