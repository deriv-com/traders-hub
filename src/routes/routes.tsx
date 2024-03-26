import { createBrowserRouter } from 'react-router-dom';

import { CompareAccounts, Homepage, Signup } from '../pages';

type TRoutes = '/' | '/signup' | '/compare-accounts';

declare module 'react-router-dom' {
    export function useNavigate(): {
        action: 'POP' | 'PUSH' | 'REPLACE';
        location: { pathname: string; search: string };
        push: (path: string | { pathname: string; search: string; state?: Record<string, unknown> }) => void;
    };
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
