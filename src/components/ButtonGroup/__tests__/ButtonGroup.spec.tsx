import { render, screen } from '@testing-library/react';

import { ButtonGroup } from '../ButtonGroup';

describe('ButtonGroup', () => {
    it('renders the children', () => {
        render(
            <ButtonGroup>
                <button>Button 1</button>
                <button>Button 2</button>
            </ButtonGroup>
        );

        expect(screen.getByText('Button 1')).toBeInTheDocument();
        expect(screen.getByText('Button 2')).toBeInTheDocument();
    });
});
