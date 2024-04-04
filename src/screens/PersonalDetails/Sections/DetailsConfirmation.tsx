import { Field, FieldProps, useFormikContext } from 'formik';

import { Checkbox } from '@deriv-com/ui';

/**
 * @name DetailsConfirmation
 * @description The DetailsConfirmation component is used to display the details confirmation checkbox in the personal details screen.
 *
 * @returns React.ReactNode
 *
 * @example
 * <DetailsConfirmation />
 */
export const DetailsConfirmation = () => {
    const { errors, values } = useFormikContext<{
        dateOfBirth: string;
        detailsConfirmation: boolean;
        firstName: string;
        lastName: string;
    }>();

    const isDisabled = Boolean(
        !values.firstName ||
            !values.lastName ||
            !values.dateOfBirth ||
            errors.firstName ||
            errors.lastName ||
            errors.dateOfBirth
    );

    return (
        <Field name='detailsConfirmation' type='checkbox'>
            {({ field, meta }: FieldProps) => (
                <Checkbox
                    disabled={isDisabled}
                    error={Boolean(meta.error && meta.touched)}
                    id='detailsConfirmation'
                    label='I confirm that the name and date of birth above match my chosen identity document.'
                    {...field}
                />
            )}
        </Field>
    );
};
