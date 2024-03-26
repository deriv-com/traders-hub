import { createBrowserRouter, NavigateOptions } from 'react-router-dom';

import { CompareAccounts, Homepage, Signup } from '../pages';

type TRoutes = '/' | '/signup' | '/compare-accounts';

declare module 'react-router-dom' {
    export function useNavigate(): (path: string, state?: NavigateOptions | undefined) => void;
    export function useRouteMatch(path: TRoutes): boolean;
}

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
