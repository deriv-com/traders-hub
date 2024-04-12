import { useAuthData } from '@deriv-com/api-hooks';
import { Text } from '@deriv-com/ui';

import { CurrencySwitcher, StaticLink, TitleDescriptionLoader } from '@/components';
import { useRegulationFlags } from '@/hooks';

const getDescription = (isEU: boolean) => {
    if (isEU) {
        return (
            <Text className='space-y-0' size='sm'>
                Get the upside of CFDs without risking more than your initial stake with
                <StaticLink staticUrl='/trade-types/multiplier/'>multipliers</StaticLink>.
            </Text>
        );
    }
    return (
        <Text className='space-y-0' size='sm'>
            Earn a range of payouts by correctly predicting market price movements with
            <StaticLink staticUrl='/trade-types/options/digital-options/up-and-down/'>options</StaticLink>, or get the
            upside of CFDs without risking more than your initial stake with
            <StaticLink staticUrl='/trade-types/multiplier/'>multipliers</StaticLink>.
        </Text>
    );
};

/**
 *  `OptionsAndMultipliersHeading` is a component that renders the heading title and currency switcher.
 * @returns {React.ElementType} The `OptionsAndMultipliersHeading` component.
 */
export const OptionsAndMultipliersHeading = () => {
    const { regulationFlags } = useRegulationFlags();
    const { isEU, isSuccess: isRegulationAccessible } = regulationFlags;
    const { isAuthorized } = useAuthData();

    const title = isEU ? 'Multipliers' : 'Options & multipliers';

    const description = getDescription(isEU);

    if (!isRegulationAccessible && isAuthorized) return <TitleDescriptionLoader />;

    return (
        <div className='flex flex-col items-start justify-between gap-16 lg:flex-row lg:gap-48'>
            <div className='gap-2 lg:flex lg:flex-col items-start'>
                <div className='d-none lg:block'>
                    <Text size='lg' weight='bold'>
                        {title}
                    </Text>
                </div>
                {description}
            </div>
            <CurrencySwitcher />
        </div>
    );
};
