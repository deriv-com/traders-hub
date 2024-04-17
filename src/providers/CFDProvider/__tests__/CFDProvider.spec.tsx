import { useEffect } from 'react';

import { render, screen } from '@testing-library/react';

import { CFDProvider, useCFDContext } from '../CFDProvider';

describe('CFDProvider', () => {
    it('provides CFD state and setter function', () => {
        const TestComponent = () => {
            const { cfdState, setCfdState } = useCFDContext();

            useEffect(() => {
                setCfdState({
                    accountId: 'testAccountId',
                });
            }, [setCfdState]);

            return <div>{cfdState.accountId}</div>;
        };

        render(
            <CFDProvider>
                <TestComponent />
            </CFDProvider>
        );

        expect(screen.getByText('testAccountId')).toBeInTheDocument();
    });

    it('throws an error when used outside of a CFDProvider', () => {
        const TestComponent = () => {
            useCFDContext();
            return null;
        };

        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => render(<TestComponent />)).toThrow(
            'useCFDContext must be used within a CFDProvider. Please import Provider from CFDProvider'
        );

        spy.mockRestore();
    });

    it('provides and updates all CFD states', () => {
        const TestComponent = () => {
            const { cfdState, setCfdState } = useCFDContext();

            useEffect(() => {
                setCfdState({
                    account: {
                        is_virtual: false,
                        loginid: 'mt512312',
                        platform: 'mt5',
                        display_balance: '1000',
                        display_login: 'MT512312',
                        convertedBalance: 1000,
                        currencyConfig: {
                            isCrypto: false,
                            isFiat: true,
                            display_code: 'USD',
                            code: 'USD',
                            fractional_digits: 2,
                            type: 'fiat',
                            name: 'US Dollar',
                            is_deposit_suspended: 1,
                            is_suspended: 0,
                            is_withdrawal_suspended: 1,
                            stake_default: 1,
                            transfer_between_accounts: {
                                fees: {
                                    deposit: 0,
                                    withdrawal: 0,
                                },
                                limits: {
                                    deposit: 0,
                                    withdrawal: 0,
                                    min: 0,
                                },
                            },
                        },
                    },
                    accountId: 'MTR123123',
                    description: 'testDescription',
                    isInvestorPassword: true,
                    marketType: 'all',
                    platform: 'ctrader',
                    selectedJurisdiction: 'testJurisdiction',
                });
            }, [setCfdState]);

            return (
                <>
                    <div>{cfdState.account?.platform}</div>
                    <div>{cfdState.accountId}</div>
                    <div>{cfdState.description}</div>
                    <div>{cfdState.isInvestorPassword ? 'true' : 'false'}</div>
                    <div>{cfdState.marketType}</div>
                    <div>{cfdState.platform}</div>
                    <div>{cfdState.selectedJurisdiction}</div>
                </>
            );
        };

        render(
            <CFDProvider>
                <TestComponent />
            </CFDProvider>
        );

        expect(screen.getByText('mt5')).toBeInTheDocument();
        expect(screen.getByText('MTR123123')).toBeInTheDocument();
        expect(screen.getByText('testDescription')).toBeInTheDocument();
        expect(screen.getByText('true')).toBeInTheDocument();
        expect(screen.getByText('ctrader')).toBeInTheDocument();
        expect(screen.getByText('all')).toBeInTheDocument();
        expect(screen.getByText('testJurisdiction')).toBeInTheDocument();
    });
});
