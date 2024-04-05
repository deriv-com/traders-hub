import { createBrowserRouter, NavigateOptions } from 'react-router-dom';

import { CompareAccounts, Homepage, Redirect, Signup } from '@/pages';

export const routes = {
    home: '/',
    signup: '/signup',
    compareAccounts: '/compare-accounts',
    redirect: '/redirect',
} as const;

type TRoutes = (typeof routes)[keyof typeof routes];
declare module 'react-router-dom' {
    export function useNavigate(): (path: string, state?: NavigateOptions | undefined) => void;
    export function useRouteMatch(path: TRoutes): boolean;
}

export const router = createBrowserRouter([
    {
        path: routes.home,
        element: <Homepage />,
    },
    {
        path: routes.signup,
        element: <Signup />,
    },
    {
        path: routes.compareAccounts,
        element: <CompareAccounts />,
    },
    {
        path: routes.redirect,
        element: <Redirect />,
    },
]);
