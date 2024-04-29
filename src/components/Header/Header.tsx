import { useAuthData } from '@deriv-com/api-hooks';
import { Button } from '@deriv-com/ui';
import { URLUtils } from '@deriv-com/utils';

import { derivUrls } from '@/helpers';

import { IconComponent } from '..';

export const Header = () => {
    const { isAuthorized, activeLoginid, logout } = useAuthData();
    const { getOauthURL, getDerivStaticURL } = URLUtils;

    return (
        <header className='border-solid border-b-1 border-b-system-light-hover-background flex px-20 sticky top-0 bg-system-light-primary-background z-50'>
            <div className='flex justify-between items-center w-full'>
                <a
                    onClick={() => {
                        window.location.href = derivUrls.DERIV_COM_PRODUCTION;
                    }}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <IconComponent icon='Deriv' className='cursor-pointer' />
                </a>
                {!(isAuthorized || activeLoginid) ? (
                    <div className='flex gap-6'>
                        <Button
                            size='sm'
                            variant='outlined'
                            color='black'
                            onClick={() => {
                                window.location.href = getOauthURL();
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            size='sm'
                            onClick={() => {
                                window.location.href = getDerivStaticURL('signup');
                            }}
                        >
                            Sign Up
                        </Button>
                    </div>
                ) : (
                    <Button size='sm' variant='outlined' color='black' onClick={logout}>
                        Logout
                    </Button>
                )}
            </div>
        </header>
    );
};
