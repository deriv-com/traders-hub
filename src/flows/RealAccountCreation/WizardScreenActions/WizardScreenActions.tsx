import { useFormikContext } from 'formik';

import { Button, Divider, useDevice } from '@deriv-com/ui';

import { ButtonGroup } from '@/components';
import { useRealAccountCreationContext } from '@/providers';

type TWizardScreenActions = {
    isSubmitBtnLoading?: boolean;
    submitDisabled?: boolean;
};

/**
 * @name WizardScreenActions
 * @description The WizardScreenActions component is used to navigate between steps in the RealAccountCreation component.
 * Intended to be used as a child component of the Formik component.
 * @param submitDisabled - A boolean that determines whether the Next button is disabled
 * @param isSubmitBtnLoading - A boolean that determines whether the Next button is in a loading state
 * @example
 * return (
 *     <WizardScreenActions submitDisabled />
 * );
 */
export const WizardScreenActions = ({ submitDisabled = false, isSubmitBtnLoading = false }: TWizardScreenActions) => {
    const {
        helpers: { canGoToNextStep, canGoToPrevStep, goToPrevStep },
    } = useRealAccountCreationContext();
    const { isSubmitting } = useFormikContext();
    const { isDesktop } = useDevice();

    return (
        <div>
            <Divider />
            <ButtonGroup className='p-24 sm:flex-row md:flex-row md:justify-end'>
                {canGoToPrevStep && (
                    <Button
                        color='black'
                        disabled={isSubmitting || isSubmitBtnLoading}
                        isFullWidth={!isDesktop}
                        onClick={goToPrevStep}
                        size={isDesktop ? 'md' : 'lg'}
                        type='button'
                        variant='outlined'
                    >
                        Back
                    </Button>
                )}
                <Button
                    disabled={submitDisabled || isSubmitBtnLoading}
                    isFullWidth={!isDesktop}
                    isLoading={isSubmitting || isSubmitBtnLoading}
                    size={isDesktop ? 'md' : 'lg'}
                    type='submit'
                >
                    {canGoToNextStep ? 'Next' : 'Add account'}
                </Button>
            </ButtonGroup>
        </div>
    );
};
