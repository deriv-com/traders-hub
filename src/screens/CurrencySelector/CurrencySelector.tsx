import { Fragment } from 'react';
import { Form, Formik, FormikValues } from 'formik';

import { Divider, Loader } from '@deriv-com/ui';

import { CurrencyTypes } from '@/constants';
import { WizardScreenActions, WizardScreenWrapper } from '@/flows';
import { useCurrencies, useRegulationFlags } from '@/hooks';
import { ACTION_TYPES, useRealAccountCreationContext } from '@/providers';

import { Currencies } from './Currencies';

/**
 * @name CurrencySelector
 * @description The CurrencySelector component is used to display the currency selector screen.
 * @returns React.ReactNode
 */
export const CurrencySelector = () => {
    const { dispatch, helpers, state } = useRealAccountCreationContext();
    const { data: currencies, isLoading } = useCurrencies();
    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;

    const handleSubmit = (values: FormikValues) => {
        dispatch({ payload: { currency: values.currency }, type: ACTION_TYPES.SET_CURRENCY });
        helpers.goToNextStep();
    };

    return (
        <WizardScreenWrapper heading='Select your preferred currency'>
            <Formik
                initialValues={{
                    currency: state.currency ?? '',
                }}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form className='flex flex-col flex-grow w-full overflow-y-auto'>
                        <div className='relative flex-1 p-16 overflow-y-auto lg:p-24'>
                            {/** temporarily setting a loader here until a proper design, needs to be here for center alignment */}
                            {isLoading && <Loader />}

                            {/** currencies as a type guard for typescript */}
                            {currencies && (
                                <Fragment>
                                    <Currencies list={currencies[CurrencyTypes.FIAT]} type={CurrencyTypes.FIAT} />
                                    {!isEU && ( // Crypto currencies are not available for EU clients
                                        <Fragment>
                                            <Divider className='my-24' />
                                            <Currencies
                                                list={currencies[CurrencyTypes.CRYPTO]}
                                                type={CurrencyTypes.CRYPTO}
                                            />
                                        </Fragment>
                                    )}
                                </Fragment>
                            )}
                        </div>
                        <WizardScreenActions submitDisabled={!values.currency} />
                    </Form>
                )}
            </Formik>
        </WizardScreenWrapper>
    );
};
