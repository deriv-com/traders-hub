import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAccountList } from '@deriv-com/api-hooks';
import { Button } from '@deriv-com/ui';
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
        <Button
            onClick={() => {
                window.location.href = URLUtils.getOauthURL();
            }}
        >
            Login
        </Button>
    );
};
