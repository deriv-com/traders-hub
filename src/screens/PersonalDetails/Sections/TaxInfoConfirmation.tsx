import { Field, FieldProps } from 'formik';

import { Checkbox } from '@deriv-com/ui';

/**
 * @name TaxInfoConfirmation
 * @description The TaxInfoConfirmation component is used to display the tax information confirmation checkbox in the personal details screen.
 * @returns React.ReactNode
 * @example
 * <TaxInfoConfirmation />
 */
export const TaxInfoConfirmation = () => {
    return (
        <Field name='taxInfoConfirmation' type='checkbox'>
            {({ field, meta }: FieldProps) => (
                <Checkbox
                    error={Boolean(meta.error && meta.touched)}
                    id='taxInfoConfirmation'
                    label='I confirm that my tax information is accurate and complete.'
                    {...field}
                />
            )}
        </Field>
    );
};
