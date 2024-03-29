import { useAuthData } from '@deriv-com/api-hooks';
import { Button } from '@deriv-com/ui';
import { URLUtils } from '@deriv-com/utils';

import { IconComponent } from '..';

export const Header = () => {
    const { isAuthorized } = useAuthData();
    const { getOauthURL, getDerivStaticURL } = URLUtils;

    return (
        <header className='border-solid border-b-1 border-b-system-light-hover-background flex px-20'>
            <div className='flex justify-between items-center w-full'>
                <IconComponent icon='Deriv' />
                {!isAuthorized && (
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
                )}
            </div>
        </header>
    );
};
