import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAccountList } from '@deriv-com/api-hooks';
import { Button, Text } from '@deriv-com/ui';
import { URLUtils } from '@deriv-com/utils';

export const Login = () => {
    const navigate = useNavigate();
    const { data } = useAccountList();

    useEffect(() => {
        if (data) {
            navigate('/homepage');
        }
    }, [data, navigate]);

    return (
        <div className='flex flex-col gap-24'>
            <Button
                onClick={() => {
                    window.location.href = URLUtils.getOauthURL();
                }}
            >
                Login
            </Button>
            <Text>Tradershub logged out version will be here. Coming soon. Stay tuned </Text>
        </div>
    );
};
