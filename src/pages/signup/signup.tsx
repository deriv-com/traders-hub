import { Link } from 'react-router-dom';

import { useDevice } from '@deriv-com/ui';

import { setPerformanceValue } from '@/utils';

export const Signup = () => {
    const { isMobile } = useDevice();

    // leave it here for now
    setPerformanceValue('signup_time', isMobile);

    return (
        <>
            <h1>Signup</h1>
            <Link to='/'>Go to Homepage</Link>
        </>
    );
};
