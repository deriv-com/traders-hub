import * as Yup from 'yup';

import { ValidationConstants } from '@deriv-com/utils';

export const passwordRegex = {
    hasLowerCase: /[a-z]/,
    hasNumber: /\d/,
    hasSymbol: /\W/,
    hasUpperCase: /[A-Z]/,
    isLengthValid: /^.{8,25}$/,
    isPasswordValid: /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[!-~]{8,25}$/,
};

const { patterns } = ValidationConstants;

export const personalDetails = Yup.object().shape({
    accountOpeningReason: Yup.string().required('Account opening reason is required.'),
    detailsConfirmation: Yup.boolean()
        .required()
        .oneOf([true], 'You must confirm that the name and date of birth above match your chosen identity document.'),
    dateOfBirth: Yup.date().typeError('Please enter a valid date.').required('Date of birth is required.'),
    firstName: Yup.string()
        .required('First name is required.')
        .matches(patterns.name, 'Letters, spaces, periods, hyphens, apostrophes only.')
        .min(2, 'You should enter 2-50 characters.')
        .max(50, 'You should enter 2-50 characters.'),
    lastName: Yup.string()
        .required('Last Name is required.')
        .matches(patterns.name, 'Letters, spaces, periods, hyphens, apostrophes only.')
        .min(2, 'You should enter 2-50 characters.')
        .max(50, 'You should enter 2-50 characters.'),
    phoneNumber: Yup.string()
        .required('Phone number is required.')
        .min(9, 'You should enter 9-35 numbers.')
        .max(35, 'You should enter 9-35 numbers.')
        .matches(patterns.phoneNumber, 'Please enter a valid phone number.'),
    placeOfBirth: Yup.string().required('Place of birth is required.'),
    taxIdentificationNumber: Yup.string().max(25, "Tax Identification Number can't be longer than 25 characters."),
    taxResidence: Yup.string().when('taxIdentificationNumber', ([taxIdentificationNumber], schema) => {
        return taxIdentificationNumber ? schema.required('Please fill in tax residence.') : schema;
    }),
    taxInfoConfirmation: Yup.boolean().when(
        ['taxIdentificationNumber', 'taxResidence'],
        ([taxIdentificationNumber, taxResidence], schema) => {
            return taxIdentificationNumber && taxResidence
                ? schema
                      .required('Tax info confirmation is required.')
                      .oneOf(
                          [true],
                          'You must confirm that the tax identification number and tax residence above are correct and up to date.'
                      )
                : schema;
        }
    ),
});

export const address = Yup.object().shape({
    firstLineAddress: Yup.string()
        .trim()
        .required('First line of address is required.')
        .max(70, 'Should be less than 70 characters.'),
    secondLineAddress: Yup.string().trim().max(70, 'Should be less than 70 characters.'),
    stateProvince: Yup.string(),
    townCity: Yup.string()
        .required('Town/City is required.')
        .max(70, 'Should be less than 70 characters.')
        .matches(patterns.addressCity, 'Only letters, space, hyphen, period, and apostrophe are allowed.'),
    zipCode: Yup.string()
        .max(20, 'Please enter a Postal/ZIP code under 20 characters.')
        .matches(patterns.postalCode, 'Only letters, numbers, space, and hyphen are allowed.'),
});

export const termsOfUse = Yup.object().shape({
    fatcaDeclaration: Yup.string().required('FATCA declaration is required.'),
    pepConfirmation: Yup.boolean().oneOf([true], 'You must confirm that you are not a PEP.'),
    termsAndCondition: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions.'),
});

export const signup = Yup.object().shape({
    citizenship: Yup.string(),
    country: Yup.string(),
    password: Yup.string().matches(passwordRegex?.isPasswordValid),
});
