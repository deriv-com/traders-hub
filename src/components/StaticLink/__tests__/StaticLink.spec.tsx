import { URLUtils } from '@deriv-com/utils';
import { render, screen } from '@testing-library/react';

import { StaticLink } from '../StaticLink';

jest.mock('@deriv-com/utils');

describe('StaticLink', () => {
    it('renders the link with the given text', () => {
        render(<StaticLink href='https://example.com'>Example</StaticLink>);

        const link = screen.getByText('Example');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('renders the link with the static URL', () => {
        (URLUtils.getDerivStaticURL as jest.Mock).mockReturnValue('https://static.example.com');

        render(<StaticLink staticUrl='/path/to/resource'>Example</StaticLink>);

        const link = screen.getByText('Example');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://static.example.com');
    });

    it('opens the link in a new tab when href is provided', () => {
        render(<StaticLink href='https://example.com'>Example</StaticLink>);

        const link = screen.getByText('Example');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('opens the link in a new tab when staticUrl is provided', () => {
        (URLUtils.getDerivStaticURL as jest.Mock).mockReturnValue('https://static.example.com');

        render(<StaticLink staticUrl='/path/to/resource'>Example</StaticLink>);

        const link = screen.getByText('Example');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
