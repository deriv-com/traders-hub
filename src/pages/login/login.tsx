import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAccountList } from '@deriv-com/api-hooks';
import { Text } from '@deriv-com/ui';

export const Login = () => {
    const navigate = useNavigate();
    const { data } = useAccountList();

    useEffect(() => {
        if (data) {
            navigate('/homepage');
        }
    }, [data, navigate]);

    return (
        <div className='flex justify-center items-center pt-30'>
            <Text size='lg'>Tradershub logged out version will be here. Coming soon. Stay tuned </Text>
        </div>
    );
};
