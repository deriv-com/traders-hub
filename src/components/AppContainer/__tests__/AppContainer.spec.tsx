import { render, screen } from '@testing-library/react';

import { AppContainer } from '../AppContainer';

describe('AppContainer', () => {
    it('renders the children', () => {
        render(<AppContainer>Test Children</AppContainer>);

        expect(screen.getByText('Test Children')).toBeInTheDocument();
    });

    it('should fail the test if the children are not provided', () => {
        // @ts-expect-error - This is expected to fail
        render(<AppContainer />);

        expect(screen.queryByText('Test Children')).not.toBeInTheDocument();
    });
});
