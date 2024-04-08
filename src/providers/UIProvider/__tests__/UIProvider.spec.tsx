import { useEffect } from 'react';

import { render, waitFor } from '@testing-library/react';

import { UIProvider, useUIContext } from '../UIProvider';

let stateUpdate = {};

const TestComponent = () => {
    const { uiState, setUIState } = useUIContext();

    useEffect(() => {
        setUIState({ accountType: 'test', isSignupWizardOpen: true, regulation: 'test' });
    }, [setUIState]);

    useEffect(() => {
        stateUpdate = uiState;
    }, [uiState]);

    return null;
};

describe('UIProvider', () => {
    it('provides UI context', async () => {
        render(
            <UIProvider>
                <TestComponent />
            </UIProvider>
        );

        await waitFor(() => {
            expect(stateUpdate).toEqual({ accountType: 'test', isSignupWizardOpen: true, regulation: 'test' });
        });
    });

    it('throws an error when used outside of a CFDProvider', () => {
        const TestComponent = () => {
            useUIContext();
            return null;
        };

        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => render(<TestComponent />)).toThrow('useUIContext must be used within a UIProvider');

        spy.mockRestore();
    });

    it('provides and updates all UI states', () => {
        const TestComponent = () => {
            const { uiState, setUIState } = useUIContext();

            useEffect(() => {
                setUIState({
                    accountType: 'test',
                    isSignupWizardOpen: true,
                    regulation: 'test',
                });
            }, [setUIState]);

            useEffect(() => {
                stateUpdate = uiState;
            }, [uiState]);

            return null;
        };

        render(
            <UIProvider>
                <TestComponent />
            </UIProvider>
        );

        expect(stateUpdate).toEqual({
            accountType: 'test',
            isSignupWizardOpen: true,
            regulation: 'test',
        });
    });
});
