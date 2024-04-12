import { Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { StandaloneXmarkBoldIcon } from '@deriv/quill-icons';
import { Modal, Text } from '@deriv-com/ui';

import { DesktopProgressBar, MobileProgressBar } from '@/components';
import { useQueryParams, useRegulationFlags } from '@/hooks';
import { ExitConfirmationDialog } from '@/modals';
import { useRealAccountCreationContext } from '@/providers';

import { WizardScreens } from './WizardScreens';

/**
 * @name getFormSteps
 * @description The getFormSteps function is used to get the form steps based on the user's location.
 * @param isEU - A boolean value to check if the user is in the EU.
 * @returns string[] - An array of strings representing the form steps.
 */
const getFormSteps = (isEU: boolean) => {
    const commonSteps = ['Account currency', 'Personal details', 'Address', 'Terms of use'];

    if (isEU) {
        return [...commonSteps.slice(0, 3), 'Trading assessment', 'Financial assessment', ...commonSteps.slice(3)];
    }
    return commonSteps;
};

const ModalBody = memo(
    ({ setIsConfirmationDialogOpen }: { setIsConfirmationDialogOpen: Dispatch<SetStateAction<boolean>> }) => {
        const { currentStep, setTotalSteps } = useRealAccountCreationContext();

        const { regulationFlags } = useRegulationFlags();
        const { isEU } = regulationFlags;

        // Get the form steps based on the user's location
        const formProgressSteps = useMemo(() => getFormSteps(isEU), [isEU]);

        // Set the total steps in the progress bar based on the form steps
        useEffect(() => {
            if (formProgressSteps.length) {
                return setTotalSteps(formProgressSteps.length);
            }
        }, [formProgressSteps.length, setTotalSteps]);

        return (
            <div className='bg-system-light-primary-background lg:max-h-[717px] lg:max-w-[1040px] h-screen w-screen lg:rounded-xl flex overflow-hidden'>
                <div className='d-none lg:block min-w-[256px] bg-system-light-secondary-background p-24'>
                    <Text as='p' className='pt-32 pb-24 text-2xl' weight='bold'>
                        Add a Deriv Account
                    </Text>
                    <DesktopProgressBar activeStep={currentStep} steps={formProgressSteps} />
                    <StandaloneXmarkBoldIcon
                        className='absolute cursor-pointer right-24 top-24'
                        onClick={() => setIsConfirmationDialogOpen(true)}
                    />
                </div>
                <div className='flex flex-col justify-between w-full'>
                    <div className='lg:d-none'>
                        <MobileProgressBar
                            activeStep={currentStep}
                            onClickClose={() => setIsConfirmationDialogOpen(true)}
                            steps={formProgressSteps}
                        />
                    </div>
                    <WizardScreens />
                </div>
            </div>
        );
    }
);
ModalBody.displayName = 'Screen';

/**
 * @name RealAccountCreation
 * @description The RealAccountCreation component is used to render the signup wizard modal.
 * @example
 * return (
 *  <RealAccountCreation />
 * );
 */
export const RealAccountCreation = memo(() => {
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const { isModalOpen } = useQueryParams();

    const onRequestClose = useCallback(() => setIsConfirmationDialogOpen(true), []);
    const closeConfirmationDialog = useCallback(() => setIsConfirmationDialogOpen(false), []);

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={isModalOpen('RealAccountCreation')}
                onRequestClose={onRequestClose}
                shouldCloseOnOverlayClick={false}
            >
                <ModalBody setIsConfirmationDialogOpen={setIsConfirmationDialogOpen} />
            </Modal>
            <ExitConfirmationDialog isOpen={isConfirmationDialogOpen} onClose={closeConfirmationDialog} />
        </>
    );
});

RealAccountCreation.displayName = 'RealAccountCreation';
