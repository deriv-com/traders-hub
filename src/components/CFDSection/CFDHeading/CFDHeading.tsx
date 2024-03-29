import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { Button, Text, useDevice } from '@deriv-com/ui';

import { StaticLink, TitleDescriptionLoader } from '@/components';
import { useRegulationFlags } from '@/hooks';

const CompareAccountsButton = ({ className }: { className?: string }) => {
    const navigate = useNavigate();

    const { isEU } = useRegulationFlags();

    const title = isEU ? 'Account information' : 'Compare Accounts';

    return (
        <Button
            className={twMerge('no-underline', className)}
            color='primary'
            onClick={() => navigate('/traders-hub/compare-accounts')}
            size='sm'
            variant='ghost'
        >
            {title}
        </Button>
    );
};

const CFDHeading = () => {
    const { isDesktop } = useDevice();
    const { isSuccess } = useRegulationFlags();

    if (!isSuccess) return <TitleDescriptionLoader />;

    return (
        <div className='flex flex-col'>
            {isDesktop && (
                <div className='flex items-center gap-x-4'>
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
            {!isDesktop && <CompareAccountsButton className='mt-16' />}
        </div>
    );
};

export default CFDHeading;
