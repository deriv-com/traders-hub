import { Form, Formik } from 'formik';

import { Text } from '@deriv-com/ui';

import { WizardScreenActions, WizardScreenWrapper } from '@/flows';
import { ScrollToFieldError } from '@/helpers';
import { ACTION_TYPES, useRealAccountCreationContext } from '@/providers';
import { personalDetails } from '@/utils/validations';

import { AdditionalInformation, Details } from './Sections';

/**
 * @name PersonalDetails
 * @description The PersonalDetails component is used to display the personal details screen.
 * @example <PersonalDetails />
 * @returns React.ReactNode
 */
export const PersonalDetails = () => {
    const { dispatch, helpers, state } = useRealAccountCreationContext();

    const initialValues = {
        firstName: state.firstName ?? '',
        lastName: state.lastName ?? '',
        dateOfBirth: state.dateOfBirth ?? '',
        detailsConfirmation: state.detailsConfirmation ?? false,
        phoneNumber: state.phoneNumber ?? '',
        placeOfBirth: state.placeOfBirth ?? '',
        taxResidence: state.taxResidence ?? '',
        taxIdentificationNumber: state.taxIdentificationNumber ?? '',
        accountOpeningReason: state.accountOpeningReason ?? '',
        taxInfoConfirmation: state.taxInfoConfirmation ?? false,
    };

    const handleSubmit = (values: typeof initialValues) => {
        dispatch({ payload: { ...values }, type: ACTION_TYPES.SET_PERSONAL_DETAILS });

        helpers.goToNextStep();
    };

    return (
        <WizardScreenWrapper heading='Complete your personal details'>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={personalDetails}
            >
                <Form className='flex flex-col flex-grow w-full overflow-y-auto'>
                    <ScrollToFieldError fieldOrder={Object.keys(initialValues)} />
                    <div className='flex-1 p-16 overflow-y-auto lg:p-24'>
                        <Text className='text-sm lg:text-default'>
                            Any information you provide is confidential and will be used for verification purposes only.
                        </Text>
                        <Details />
                        <AdditionalInformation />
                    </div>
                    <WizardScreenActions />
                </Form>
            </Formik>
        </WizardScreenWrapper>
    );
};
