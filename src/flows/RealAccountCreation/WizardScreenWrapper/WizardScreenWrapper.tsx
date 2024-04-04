import { ReactNode } from 'react';

import { Text, useDevice } from '@deriv-com/ui';

type TWizardScreenWrapper = { children: ReactNode; heading: ReactNode };

/**
 * @name WizardScreenWrapper
 * @description The WizardScreenWrapper component is used to wrap the screens in the RealAccountCreation component.
 * @param children - The content to be wrapped.
 * @param heading - The heading of the screen.
 * @example
 * return (
 *    <WizardScreenWrapper heading="Heading">
 *       <div>Content</div>
 *   </WizardScreenWrapper>
 * );
 */
export const WizardScreenWrapper = ({ children, heading }: TWizardScreenWrapper) => {
    const { isDesktop } = useDevice();
    return (
        <div className='flex flex-col justify-between h-full min-h-0 bg-system-light-primary-background'>
            {isDesktop && (
                <Text as='p' className='pt-48 pl-24 text-lg font-bold'>
                    {heading}
                </Text>
            )}
            {children}
        </div>
    );
};
