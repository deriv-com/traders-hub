import { ChangeEvent } from 'react';
import { useFormikContext } from 'formik';

import { Button, PasswordInput, Text } from '@deriv-com/ui';

import { useUIContext } from '@/providers';
import { validPassword } from '@/utils';

import { TSignupFormValues } from '../SignupWrapper/SignupWrapper';

export const PasswordSettingModal = () => {
    const { values, setFieldValue } = useFormikContext<TSignupFormValues>();
    const { uiState } = useUIContext();

    const { errorMessage } = uiState;

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFieldValue('password', e.target.value);
    };

    return (
        <div className='rounded-xl bg-system-light-primary-background'>
            <div className='flex flex-col p-16 space-y-16 lg:space-y-24 lg:p-24 rounded-xl'>
                <Text align='center' weight='bold' className='text-default lg:text-lg'>
                    Keep your account secure with a password
                </Text>
                <PasswordInput
                    isFullWidth
                    label='Create a password'
                    onChange={onPasswordChange}
                    value={values.password}
                    customErrorMessage={errorMessage}
                />
                <Text align='center' size='xs'>
                    Strong passwords contain at least 8 characters. combine uppercase and lowercase letters, numbers,
                    and symbols.
                </Text>
                <Button
                    className='w-full lg:self-end lg:w-fit'
                    disabled={!validPassword(values.password)}
                    type='submit'
                >
                    Start trading
                </Button>
            </div>
        </div>
    );
};
