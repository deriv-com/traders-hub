import { useNavigate } from 'react-router-dom';

import { useAuthData } from '@deriv-com/api-hooks';
import { Button, Text, useDevice } from '@deriv-com/ui';

import { StaticLink, TitleDescriptionLoader } from '@/components';
import { useRegulationFlags } from '@/hooks';

const CompareAccountsButton = () => {
    const navigate = useNavigate();
    const { isAuthorized } = useAuthData();

    const { isEU } = useRegulationFlags();

    const title = isEU ? 'Account information' : 'Compare Accounts';

    if (!isAuthorized) return null;

    return (
        <Button
            color='primary'
            onClick={() => navigate('/traders-hub/compare-accounts')}
            size='sm'
            variant='ghost'
            hideHoverStyles
        >
            {title}
        </Button>
    );
};

const CFDHeading = () => {
    const { isDesktop } = useDevice();
    const { isSuccess } = useRegulationFlags();
    const { isAuthorized } = useAuthData();

    if (!isSuccess && isAuthorized) return <TitleDescriptionLoader />;

    return (
        <div className='flex flex-col'>
            {isDesktop && (
                <div className='flex items-center gap-x-4 '>
                    <Text size='lg' weight='bold' align='left'>
                        CFDs
                    </Text>
                    <CompareAccountsButton />
                </div>
            )}
            <Text className='leading-18' size='sm' align='left'>
                Trade with leverage and tight spreads for better returns on trades.
                <StaticLink staticUrl='/trade-types/cfds/'>Learn more</StaticLink>
            </Text>
            <div className='flex items-start'>{!isDesktop && <CompareAccountsButton />}</div>
        </div>
    );
};

export default CFDHeading;
