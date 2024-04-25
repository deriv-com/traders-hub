import { Link } from 'react-router-dom';

import CompareAccountsScreen from '../../cfd/screens/CFDCompareAccounts/CompareAccountsScreen';

export const CompareAccounts = () => {
    return (
        <>
            <Link to='/'>Go to Homepage</Link>
            <CompareAccountsScreen />
        </>
    );
};
