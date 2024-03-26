import { createBrowserRouter } from 'react-router-dom';

import { CompareAccounts, Homepage, Signup } from '../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/compare-accounts',
        element: <CompareAccounts />,
    },
]);
