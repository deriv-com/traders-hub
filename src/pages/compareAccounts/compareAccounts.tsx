import { Link } from 'react-router-dom';

import CompareAccountsScreen from '../../cfd/screens/CFDCompareAccounts/CompareAccountsScreen';

export const CompareAccounts = () => {
    return (
        <>
            <div>
                <h1>Compare Accounts</h1>
                <Link to='/'>Go to Homepage</Link>
            </div>
            <CompareAccountsScreen />
        </>
    );
};
