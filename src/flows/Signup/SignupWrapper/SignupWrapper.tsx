import { useState } from 'react';
import { Form, Formik } from 'formik';

import { Modal } from '@deriv-com/ui';

import { useQueryParams } from '@/hooks';
import { signup } from '@/utils/validations';

import { SignupScreens } from '../SignupScreens';

export type TSignupFormValues = {
    citizenship: string;
    country: string;
    password: string;
};

export const SignupWrapper = () => {
    const [step, setStep] = useState(1);
    const { openModal, isModalOpen } = useQueryParams();

    const initialValues = {
        country: '',
        citizenship: '',
        password: '',
    };

    const handleSubmit = () => {
        // logic will be added later
        openModal('RealAccountCreation');
    };

    return (
        <Modal ariaHideApp={false} isOpen={isModalOpen('Signup')} shouldCloseOnOverlayClick={false}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signup}>
                <Form>
                    <SignupScreens setStep={setStep} step={step} />
                </Form>
            </Formik>
        </Modal>
    );
};
